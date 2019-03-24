'use strict';

/**
 * @ngdoc directive
 * @name bookEditorApp.directive:bookImage
 * @description
 * # bookImage
 */
angular.module('bookEditorApp')
  .directive('bookImage', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('change', function () {
          if (this.files && this.files[0]) {
            var file = this.files[0];
            var reader = new FileReader();
            var maxSize = parseInt(attrs.maxSize || 0) || Infinity;
            var accept = element.attr('accept');
            var elementName = element.attr('name');
            var formName = element.parents('form').attr('name');

            if (file.size > maxSize) {
              scope[formName][elementName].$setValidity('maxSize', false);
            } else if (accept && accept.indexOf(file.type) < 0) {
              scope[formName][elementName].$setValidity('types', false);
            } else {
              scope[formName][elementName].$setValidity('maxSize', true);
              scope[formName][elementName].$setValidity('types', true);
            }

            reader.onload = function () {
              $parse(attrs.ngModel).assign(scope, reader.result);
              scope.$apply();
            };

            reader.readAsDataURL(file);

            element.val('');
          }
        });
      }
    }
  });
