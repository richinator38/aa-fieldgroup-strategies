(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'aa.formExtensions',
        'aa.formExternalConfiguration',
        'aaCustomFGS',
        'aa.notify',
        'aa.select2'
    ])
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