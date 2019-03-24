'use strict';

/**
 * @ngdoc function
 * @name bookEditorApp.controller:FiltersCtrl
 * @description
 * # FiltersCtrl
 * Controller of the bookEditorApp
 */
angular.module('bookEditorApp')
  .controller('FiltersCtrl', ['$scope', function ($scope) {
    $scope.updateSorting = function (sort, direction) {
      if (sort && direction) {
        $scope.filters.currentPage = 1;
        $scope.filters.sort = sort;
        $scope.filters.sortDirection = direction;
        $scope.updateFilters($scope.filters);
      }
    };

    $scope.updatePage = function () {
      $scope.updateFilters($scope.filters);
    };

    $scope.updatePerPage = function (itemsPerPage) {
      if (itemsPerPage) {
        $scope.filters.currentPage = 1;
        $scope.filters.itemsPerPage = itemsPerPage;
        $scope.updateFilters($scope.filters);
      }
    };
  }]);
