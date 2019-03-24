'use strict';

/**
 * @ngdoc service
 * @name bookEditorApp.modal
 * @description
 * # modal
 * Service in the bookEditorApp.
 */
angular.module('bookEditorApp')
  .service('modal', ['$uibModal',
    function ($uibModal) {

      var modalMap = {
        confirmationModal: {
          template: '/views/templates/confirmation-modal.html'
        },
        editBookModal: {
          template: '/views/templates/edit-book-modal.html',
          size: 'lg'
        },
        editAuthorModal: {
          template: '/views/templates/edit-author-modal.html'
        }
      };

      var modalInstance;

      this.open = function (options) {
        modalInstance = $uibModal.open({
          templateUrl: modalMap[options.type].template,
          backdrop: 'static',
          keyboard: false,
          scope: options.scope,
          size: modalMap[options.type].size ? modalMap[options.type].size : ''
        });
      };

      this.close = function () {
        modalInstance.close();
      };
    }]);
