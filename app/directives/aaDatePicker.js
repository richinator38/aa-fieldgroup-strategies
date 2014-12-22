(function() {
    'use strict';

    angular
        .module('aaCustomFGS')
        .directive('aaDatePicker', aaDatePicker);

    aaDatePicker.$inject = ['$compile'];
    
    function aaDatePicker($compile) {
        var directive = {
            link: link,
            priority: 900,
            restrict: 'A',
            controller: ['$scope', controller]
        };
        return directive;

        function controller($scope) {
            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };
        }

        function link(scope, element, attrs) {
            // Doing this here instead of the field group strategy so that the validation errors go below the <p> tag,
            // otherwise, the error messages show up and bring down the calender button.
            var datePickerBtn = angular.element('<span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="fa fa-calendar"></i></button></span>');
            $(element).wrap('<p class="input-group"></p>');

            // So the datepicker ng-click works...
            var newDateBtn = $compile(datePickerBtn)(scope);
            $(element).after(datePickerBtn);
        }
    }

})();