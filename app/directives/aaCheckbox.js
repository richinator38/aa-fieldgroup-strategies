(function() {
    'use strict';

    angular
        .module('aaCustomFGS')
        .directive('aaCheckbox', aaCheckbox);

    function aaCheckbox () {
        var directive = {
            compile: compileFn,
            restrict: 'A',
            priority: 900
        };
        return directive;

        function compileFn(tElem, tAttrs) {

            return {
                pre: preLink,
                post: postLink
            }
        }

        function preLink(scope, iElem, iAttrs) {
        }

        function postLink(scope, element, attrs) {
            var lblText = element.attr('aa-label');
            element.removeAttr('aa-label');
            element.removeClass('form-control');

            // Doing this here instead of the field group strategy so that the validation errors go below the label tag,
            // otherwise, the error messages show up and bring down the checkbox.
            var textEl = angular.element('<span class="bold">' + lblText + '</span>');
            $(element).wrap('<label></label>');

            $(element).after(textEl);
        }
    }

})();