'use strict';

/**
 * @ngdoc service
 * @name bookEditorApp.validationRules
 * @description
 * # validationRules
 * Service in the bookEditorApp.
 */
angular.module('bookEditorApp')
  .service('validationRules', function () {
    var commonRules = {
      name: {
        required: true,
        maxlength: 20
      }
    };

    var commonMessages = {
      required: 'Field is required.',
      number: 'Field must be a number'
    };

    var getMinMaxMessage = function (fieldName, min, max, isNumber) {
      var helpText = '';

      if (min && max) {
        helpText = 'between ' + min + ' and ' + max
      } else if (min && !max) {
        helpText = 'more than ' + min
      } else if (!min && max) {
        helpText = 'less than ' + max
      }

      return fieldName + ' must be ' + helpText + (isNumber ? '' : ' characters long.');
    };

    var getFileTypeMessage = function (types) {
      return 'File must be one of next types: ' + types.map(function (type) {
        return type.substring(type.indexOf('/'));
      }).join(', ');
    };

    var rules = {
      bookForm: {
        title: {
          required: true,
          maxlength: 30
        },
        pagesCount: {
          type: 'number',
          required: true,
          min: 1,
          max: 10000
        },
        authors: {
          required: true
        },
        publisher: {
          maxlength: 30
        },
        publicationYear: {
          type: 'number',
          min: 1800
        },
        releaseDate: {
          minDate: new Date(1800, 0, 1),
          initDate: new Date(),
          isOpen: false
        },
        isbn: {},
        image: {
          maxSize: 2 * 1024 * 1024,
          types: ['image/jpeg', 'image/jpg', 'image/png'],
        }
      },
      authorForm: {
        firstName: commonRules.name,
        lastName: commonRules.name
      }
    };

    var messages = {
      bookForm: {
        title: {
          required: commonMessages.required,
          maxlength: getMinMaxMessage('Book Title', null, rules.bookForm.title.maxlength)
        },
        pagesCount: {
          required: commonMessages.required,
          min: getMinMaxMessage('Pages Count', rules.bookForm.pagesCount.min, rules.bookForm.pagesCount.max, true),
          max: getMinMaxMessage('Pages Count', rules.bookForm.pagesCount.min, rules.bookForm.pagesCount.max, true),
          number: commonMessages.number
        },
        authors: {
          required: commonMessages.required,
        },
        publisher: {
          maxlength: getMinMaxMessage('Book Publisher', null, rules.bookForm.publisher.maxlength)
        },
        publicationYear: {
          min: getMinMaxMessage('Book Publication Year', rules.bookForm.publicationYear.min, null, true),
          number: commonMessages.number
        },
        isbn: {
          isbn: 'Enter a valid ISBN number'
        },
        image: {
          maxSize: 'File must be less than ' + (rules.bookForm.image.maxSize / 1024 / 1024) + 'MB',
          types: getFileTypeMessage(rules.bookForm.image.types),
        }
      },
      authorForm: {
        firstName: {
          required: commonMessages.required,
          maxlength: getMinMaxMessage('First Name', null, rules.authorForm.firstName.maxlength)
        },
        lastName: {
          required: commonMessages.required,
          maxlength: getMinMaxMessage('Last Name', null, rules.authorForm.firstName.maxlength)
        }
      }
    };

    return {
      rules: rules,
      messages: messages
    }
  });
