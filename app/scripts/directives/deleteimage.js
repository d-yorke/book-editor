'use strict';

/**
 * @ngdoc directive
 * @name bookEditorApp.directive:deleteImage
 * @description
 * # deleteImage
 */
angular.module('bookEditorApp')
  .directive('deleteImage', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          var form = element.parents('form');
          var formName = form.attr('name');
          var elementName = attrs.deleteImage;

          scope[formName][elementName].$setValidity('maxSize', true);
          scope[formName][elementName].$setValidity('types', true);

          $parse(form.find('[name="'+ elementName +'"]').attr('ng-model')).assign(scope, '');
          scope.$apply();
        });
      }
    }
  });
