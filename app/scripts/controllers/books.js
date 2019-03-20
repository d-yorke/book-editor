'use strict';

/**
 * @ngdoc function
 * @name bookEditorApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the bookEditorApp
 */
angular.module('bookEditorApp')
  .controller('BooksCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.$storage = $localStorage;
  }]);
