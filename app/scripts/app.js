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
    'ngMessages',
    'ui.bootstrap',
    'ui.select2'
  ])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix('');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl',
        reloadOnSearch: false
      })
      .when('/authors', {
        templateUrl: 'views/authors.html',
        controller: 'AuthorsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('AppCtrl', ['$scope', '$location', '$route', 'localStorage', function ($scope, $location, $route, localStorage) {
    $scope.reset = localStorage.initData;
    $scope.clear = localStorage.clearData;
  }]);
