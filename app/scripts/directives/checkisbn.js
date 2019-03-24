'use strict';

/**
 * @ngdoc directive
 * @name bookEditorApp.directive:checkisbn
 * @description
 * # checkisbn
 */
angular.module('bookEditorApp')
  .directive('checkisbn', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.isbn = function (modelValue, viewValue) {
          var ISBN = (viewValue || '').toString();
          var isbnReg = /^(?:\d{9}[\dXx]|\d{13})$/;

          if (ISBN === '') {
            return true;
          }

          if (!isbnReg.test(ISBN)) {
            return false;
          }

          var validators = {
            isbn10: function (isbn) {
              var number = isbn.slice(0, -1);
              var last = isbn.slice(-1);
              var lastDigit = (last !== 'X') ? parseInt(last, 10) : 'X';

              number = number.split('').map(Number);

              number = number.map(function(digit, index) {
                return digit * (index + 1);
              });

              var sum = number.reduce(function(a, b)  {
                return a + b;
              }, 0);

              var controlDigit = sum % 11;

              return lastDigit === (controlDigit !== 10 ? controlDigit : 'X');
            },

            isbn13: function (isbn) {
              var checksum = function (arr) {
                var weights = [1,3,1,3,1,3,1,3,1,3,1,3,1];

                return arr
                  .reduce(function (a, x, i) {
                    a.push([Number(x), weights[i]]);
                    return a;
                  }, [])
                  .reduce(function (sum, a) {
                    return sum + a[0] * a[1];
                  }, 0);
              };

              return checksum(isbn.split('')) % 10 === 0;
            }
          };

          return validators['isbn' + ISBN.length](ISBN);
        };
      }
    }
  });
