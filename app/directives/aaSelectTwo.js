(function() {
    'use strict';

    angular
        .module('app')
        .directive('aaSelectTwo', aaSelectTwo);

    aaSelectTwo.$inject = [];
    
    function aaSelectTwo () {
        // Usage:
        //     <input aa-select2>
        // Creates:
        // 
        var directive = {
            link: postLink,
            restrict: 'A',
            priority: 900
        };
        return directive;

        function postLink(scope, element, attrs) {
            element.removeAttr('config');
            element.removeAttr('translate-label');
            element.removeAttr('aa-select-two');
            element.removeAttr('aa-label');
            element.removeClass('form-control');
        }
    }

})();