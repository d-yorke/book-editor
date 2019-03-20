'use strict';

/**
 * @ngdoc service
 * @name bookEditorApp.book
 * @description
 * # book
 * Service in the bookEditorApp.
 */
angular.module('bookEditorApp')
  .service('book', ['$localStorage', 'utils', function ($localStorage, utils) {
    var $storage = $localStorage;

    this.addBook = function (book) {
      if (!$storage.books) {
        $storage.books = [];
      }

      $storage.books.push(book);
    };

    this.editBook = function (id, newBook) {
      angular.merge($storage.books[utils.getBookIndexById(id)], newBook);
    };

    this.deleteBook = function (id) {
      if (id) {
        delete $storage.books[utils.getBookIndexById(id)];
      }
    };
  }]);
