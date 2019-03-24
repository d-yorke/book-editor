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
    var that = this;

    this.getIndexById = function (arrayName, id) {
      if (id) {
        for (var i = 0; i < $storage[arrayName].length; i++) {
          if (id === $storage[arrayName][i].id) {
            return i;
          }
        }
      }
    };

    this.populateAuthors = function (authors) {
      if (authors) {
        return authors.map(function (authorId) {
          return $storage.authors[that.getIndexById('authors', authorId)];
        });
      }
    }
  }]);
