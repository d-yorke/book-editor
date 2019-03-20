'use strict';

/**
 * @ngdoc function
 * @name bookEditorApp.controller:AuthorsCtrl
 * @description
 * # AuthorsCtrl
 * Controller of the bookEditorApp
 */
angular.module('bookEditorApp')
  .controller('AuthorsCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.$storage = $localStorage;
    $scope.$storage.books = [{ name: 'kek', author: 'lel' }];
  }]);
