(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngSanitize',

        // Custom modules 

        // 3rd Party Modules
        'ui.router',
        'ui.bootstrap',
        'aa.formExtensions',
        'aa.formExternalConfiguration',
        'aaCustomProviders',
        'aa.notify',
        'aa.select2'
    ])
        .config(['datepickerConfig', function (datepickerConfig) {
            // Date picker configuration
            datepickerConfig.showWeeks = false;
        }])
        .config(['datepickerPopupConfig', function (datepickerPopupConfig) {
            // Date picker pop-up configuration
            datepickerPopupConfig.datepickerPopup = 'MM/dd/yyyy';
            datepickerPopupConfig.closeText = "Close";
        }])
        .config(['aaCustomProvider', function (aaCustomProvider) {
            aaCustomProvider.initProvider();
        }])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('aatest', {
                url: '',
                views: {
                    'content@': {
                        templateUrl: 'features/angularAgilityTest/angularAgilityTest.html',
                        controller: 'angularAgilityTestController'
                    }
                }
            });
        }]);
})();