'use strict';

/**
 * @ngdoc service
 * @name bookEditorApp.localStorage
 * @description
 * # localStorage
 * Service in the bookEditorApp.
 */
angular.module('bookEditorApp')
  .service('localStorage', ['$location', '$filter', '$route', '$localStorage', 'utils', 'initialData',
    function ($location, $filter, $route, $localStorage, utils, initialData) {
      var $storage = $localStorage;

      var getTimestamp = function (date) {
        return date instanceof Date ? date.getTime() : date;
      };

      this.getList = function (filters, array) {
        if (!array || !$storage[array]) {
          return [];
        }

        if (!filters) {
          filters = {};
        }

        var preparedFilters = {
          limit: filters.itemsPerPage || 6,
          offset: filters.currentPage && filters.itemsPerPage ? (filters.currentPage - 1) * filters.itemsPerPage : 0,
          sort: filters.sort || 'title',
          sortDirection: filters.sortDirection || 'asc'
        };

        var preparedList = $filter('orderBy')(
          angular.copy($storage[array], []),
          preparedFilters.sort,
          preparedFilters.sortDirection === 'desc'
        ).slice(preparedFilters.offset, preparedFilters.limit + preparedFilters.offset);

        if (array === 'books') {
          preparedList = preparedList.map(function (book) {
            book.authors = utils.populateAuthors(book.authors);

            return book;
          })
        }

        $location.search({
          page: (preparedFilters.offset / preparedFilters.limit) + 1,
          perPage: preparedFilters.limit,
          sortBy: preparedFilters.sort,
          sortDirection: preparedFilters.sortDirection
        });

        return { list: preparedList, count: $storage[array].length };
      };

      this.getItem = function (id, array) {
        if (array && id) {
          return angular.copy($storage[array][utils.getIndexById(array, Number(id))], {});
        }
      };

      this.addItem = function (newItem, array) {
        if (!$storage.books) {
          $storage.books = [];
        }

        if (array === 'books') {
          newItem.releaseDate = getTimestamp(newItem.releaseDate);
        }

        newItem.id = Date.now();
        $storage[array].push(newItem);
      };

      this.editItem = function (newItem, array) {
        if (newItem) {
          if (array === 'books') {
            newItem.releaseDate = getTimestamp(newItem.releaseDate);
          }

          angular.extend($storage[array][utils.getIndexById(array, newItem.id)], newItem);
        }
      };

      this.deleteItem = function (item, array) {
        if (array && item && item.id) {
          $storage[array].splice([utils.getIndexById(array, item.id)], 1);
        }
      };

      this.initData = function () {
        $storage.books = initialData.books;
        $storage.authors = initialData.authors;
        $route.reload();
      };

      this.clearData = function () {
        $localStorage.$reset();
        $route.reload();
      };
  }]);
