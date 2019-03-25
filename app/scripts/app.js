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
    'ngRoute',
    'ngMessages',
    'ngStorage',
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
        reloadOnSearch: false,
        title: 'Books'
      })
      .when('/authors', {
        templateUrl: 'views/authors.html',
        controller: 'AuthorsCtrl',
        reloadOnSearch: false,
        title: 'Authors'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('AppCtrl', ['$rootScope', '$scope', '$route', 'localStorage',
    function ($rootScope, $scope, $route, localStorage) {
    $scope.reset = localStorage.initData;
    $scope.clear = localStorage.clearData;

    $rootScope.$on('$routeChangeSuccess', function (event, current) {
      $scope.currentPage = current.$$route.title;
    });
  }]);
