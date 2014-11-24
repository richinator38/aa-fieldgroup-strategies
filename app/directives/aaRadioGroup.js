(function() {
    'use strict';

    angular
        .module('app')
        .directive('aaRadioGroup', aaRadioGroup);

    aaRadioGroup.$inject = [];

    function aaRadioGroup() {
        // Usage:
        //     <input aa-radio-group />
        // Creates:
        // 
        var directive = {
            compile: compileFn,
            restrict: 'A',
            require: ['^form'],
            controller: controllerDef,
            priority: 900
        };
        return directive;

        function compileFn(tElem, tAttrs) {
            tElem.removeClass('form-control');
            tElem.removeAttr('aa-field-group-strategy');
            tElem.removeAttr('aa-radio-group');

            return function (scope, element, attrs, controllers) {
                var ngForm = controllers[0];
                var invalidCheck = ngForm.$name + '.' + attrs['name'] + '.$invalid';
                scope.$watch(function () { return invalidCheck; }, function (field) {
                    if (!angular.isUndefined(field)) {
                        scope.$watch(field, function (isInvalid) {
                            if (isInvalid) {
                                $(element).closest('.radio-update').removeClass('form-item-invalid').addClass('form-item-invalid');
                            }
                            else {
                                $(element).closest('.radio-update').removeClass('form-item-invalid');
                            }
                        });
                    }
                });
            };
        }

        function controllerDef($scope) {
            $scope.activate = function (option, $event) {
                $scope.ngModel = option['id'];
                if ($event && $event.currentTarget.localName == 'label') {
                    var inputElement = $($event.currentTarget).find('input');
                    $(inputElement).prop('checked', true);
                }
            };
        }
    }

})();