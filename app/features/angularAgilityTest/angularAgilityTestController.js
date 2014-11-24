(function () {
    'use strict';

    angular
        .module('app')
        .controller('angularAgilityTestController', angularAgilityTestController);

    angularAgilityTestController.$inject = ['$scope', '$state', 'aaSelectService', 'aaNotify'];

    function angularAgilityTestController($scope, $state, aaSelectService, aaNotify) {
        $scope.model = { };
        $scope.states = [{ 'name': 'Minnesota', 'id': 'MN' }, { 'name': 'Wisconsin', 'id': 'WI' }];
        $scope.radioList = [{ name: 'Male', id: 0 }, { name: 'Female', id: 1 }];

        // Gives us our validations for the form.
        $scope.formconfig = {
            validations: {
                model: {
                    Name: {
                        required: true
                    }
                    , BirthDate: {
                        required: true
                    }
                    , FavoriteNumber: {
                        min: 1,
                        max: 100
                    }
                    , Salary: {
                        'ng-pattern': '/^(\\d+\\.?\\d*|\\.\\d+)$/',
                        'ng-pattern-msg': 'Salary must be a decimal number'
                    }
                    , Gender: {
                        required: true
                    }
                    , State: {
                        required: true
                    }
                    , Street: {
                        'ng-minlength': 3,
                        'ng-maxlength': 25
                    }
                }
            }
        };

        // Use a json array constant to get options.
        $scope.stateSingleConfig = aaSelectService.getConfigSingle({
            options: $scope.states,
            placeholder: 'Select a state...'
        });

        $scope.submit = function () {
            aaNotify.success('Form successfully submitted');
            $state.go('aatest', null, { reload: "true" });
        }
    }
})();
