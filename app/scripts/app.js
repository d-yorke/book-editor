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
    'ngTouch'
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
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
