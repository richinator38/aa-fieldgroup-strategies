(function() {
    'use strict';

    angular
        .module('aaCustomFGS')
        .directive('aaPercent', aaPercent);

    aaPercent.$inject = [];

    function aaPercent() {
        var directive = {
            link: link,
            priority: 900,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            // Doing this here instead of the field group strategy so that the validation errors go below the input-group class,
            // otherwise, the error messages show up and bring down the percent symbol.
            var percentEl = angular.element('<span class="input-group-addon">%</span>');
            $(element).wrap('<div class="input-group"></div>');

            $(element).after(percentEl);
        }
    }

})();