'use strict';

/**
 * @ngdoc function
 * @name bookEditorApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the bookEditorApp
 */
angular.module('bookEditorApp')
  .controller('BooksCtrl', ['$scope', '$location', 'localStorage', 'modal', 'validationRules',
    function ($scope, $location, localStorage, modal, validationRules) {
      $scope.bookList = [];
      $scope.queryProps = $location.search();
      $scope.selectedItem = {};
      $scope.modalOptions = {};
      $scope.isOpen = false;
      $scope.authors = localStorage.getList({ itemsPerPage: 100 }, 'authors').list;
      $scope.validationRules = validationRules;

      $scope.filters = {
        totalItems: 0,
        currentPage: Number($scope.queryProps.page) || 1,
        sortProps: [{ prop: 'title', name: 'Title' }, { prop: 'publicationYear', name: 'Year' }],
        sort: $scope.queryProps.sortBy || 'title',
        sortDirection: $scope.queryProps.sortDirection || 'asc',
        itemsPerPage: Number($scope.queryProps.perPage) || 6,
        action: function () {
          $scope.openModal('addItem');
        }
      };

      $scope.getListOfBooks = $scope.updateFilters = function (filters) {
        var data = localStorage.getList(filters, 'books');

        $scope.bookList = data.list;
        $scope.filters.totalItems = data.count;
      };

      $scope.closeModal = function () {
        modal.close();
        $scope.selectedItem = {};
      };

      $scope.openModal = function (type, id) {
        if (type) {
          var isDelete = type === 'deleteItem';
          var titles = { addItem: 'Add Book', editItem: 'Edit Book: ', deleteItem: 'Delete Book: ' };

          $scope.selectedItem = id ? localStorage.getItem(id, 'books') : {};
          $scope.modalOptions = {
            type: isDelete ? 'confirmationModal' : 'editBookModal',
            title: titles[type] + ($scope.selectedItem.id || ''),
            text: isDelete ? ('Are you sure you want to delete book "' + $scope.selectedItem.title + '"?') : '',
            scope: $scope,
            action: function () {
              localStorage[type]($scope.selectedItem, 'books');
              $scope.closeModal();
              $scope.getListOfBooks($scope.filters);
            },
            close: $scope.closeModal
          };

          modal.open($scope.modalOptions);
        }
      };

      $scope.getListOfBooks($scope.filters);
    }]);
