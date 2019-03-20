'use strict';

/**
 * @ngdoc overview
 * @name bookEditorApp
 * @description
 * # bookEditorApp
 *
 * Main module of the application.
 */
angular
  .module('bookEditorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
  ])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix('');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl',
        controllerAs: 'books'
      })
      .when('/authors', {
        templateUrl: 'views/authors.html',
        controller: 'AuthorsCtrl',
        controllerAs: 'authors'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('appCtrl', ['$scope', '$localStorage', 'initialData', function ($scope, $localStorage, initialData) {
    $scope.$storage = $localStorage;

    $scope.initData = function () {
      $scope.$storage.books = initialData.books;
      $scope.$storage.authors = initialData.authors;
    };

    $scope.clearData = function () {
      $localStorage.$reset();
    };

    $scope.initData();
  }]);
