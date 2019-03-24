'use strict';

/**
 * @ngdoc function
 * @name bookEditorApp.controller:AuthorsCtrl
 * @description
 * # AuthorsCtrl
 * Controller of the bookEditorApp
 */
angular.module('bookEditorApp')
  .controller('AuthorsCtrl', ['$scope', '$location', 'localStorage', 'modal', 'validationRules',
    function ($scope, $location, localStorage, modal, validationRules) {
      $scope.authorList = [];
      $scope.queryProps = $location.search();
      $scope.selectedItem = {};
      $scope.validationRules = validationRules;
      $scope.filters = {
        totalItems: 0,
        currentPage: Number($scope.queryProps.page) || 1,
        sortProps: [{ prop: 'firstName', name: 'First Name' }, { prop: 'lastName', name: 'Last Name' }],
        sort: $scope.queryProps.sortBy || 'firstName',
        sortDirection: $scope.queryProps.sortDirection || 'asc',
        itemsPerPage: Number($scope.queryProps.perPage) || 6,
        action: function () {
          $scope.openModal('addItem');
        }
      };

      $scope.getAuthors = $scope.updateFilters = function (filters) {
        var data = localStorage.getList(filters, 'authors');

        $scope.authorList = data.list;
        $scope.filters.totalItems = data.count;
      };

      $scope.closeModal = function () {
        modal.close();
        $scope.selectedBook = {};
      };

      $scope.openModal = function (type, id) {
        if (type) {
          var isDelete = type === 'deleteItem';
          var titles = { addItem: 'Add Author', editItem: 'Edit Author: ', deleteItem: 'Delete Author: ' };

          $scope.selectedItem = id ? localStorage.getItem(id, 'authors') : {};
          $scope.modalOptions = {
            type: isDelete ? 'confirmationModal' : 'editAuthorModal',
            title: titles[type] + ($scope.selectedItem.id || ''),
            text: isDelete ? ('Are you sure you want to delete author "' +
              $scope.selectedItem.firstName + ' ' + $scope.selectedItem.lastName + '"?') : '',
            scope: $scope,
            action: function () {
              localStorage[type]($scope.selectedItem, 'authors');
              $scope.closeModal();
              $scope.getAuthors($scope.filters);
            },
            close: $scope.closeModal
          };

          modal.open($scope.modalOptions);
        }
      };

      $scope.getAuthors($scope.filters);
  }]);
