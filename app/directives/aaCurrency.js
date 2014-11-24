(function() {
    'use strict';

    angular
        .module('app')
        .directive('aaCurrency', aaCurrency);

    aaCurrency.$inject = ['$rootScope'];
    
    function aaCurrency($rootScope) {
        // Usage:
        //     <input aa-currency />
        // Creates:
        // 
        var directive = {
            link: link,
            priority: 900,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            // Doing this here instead of the field group strategy so that the validation errors go below the input-group class,
            // otherwise, the error messages show up and bring down the currency symbol.
            var currencyEl = angular.element('<span class="input-group-addon currency">$</span>');
            $(element).wrap('<div class="input-group"></div>');

            $(element).before(currencyEl);

            $rootScope.$on('$translateChangeSuccess', function () {
                var fg = element.closest('.form-group');
                if (fg && fg.length > 0) {
                    var currSpan = fg.find('.currency');
                    if (currSpan && currSpan.length > 0) {
                        currSpan.html('$');
                    }
                }
            });
        }
    }

})();