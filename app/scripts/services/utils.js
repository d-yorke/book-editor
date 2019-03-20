'use strict';

/**
 * @ngdoc service
 * @name bookEditorApp.utils
 * @description
 * # utils
 * Service in the bookEditorApp.
 */
angular.module('bookEditorApp')
  .service('utils', ['$localStorage', function ($localStorage) {
    var $storage = $localStorage;

    this.getBookIndexById = function (id) {
      if (id) {
        for (var i = 0; i < $storage.books.length; i++) {
          if (id === $storage.books[i].id) {
            return i;
          }
        }
      }
    }
  }]);
