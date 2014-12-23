(function () {
    'use strict';

    angular
        .module('aaCustomFGS')
        .factory('aaSelectService', aaSelectService);

    aaSelectService.$inject = ['$http'];

    function aaSelectService($http) {
        var defaultId = 'id',
            defaultName = 'name';

        var service = {
            getConfigSingle: getConfigSingle,
            getConfigAjaxSingle: getConfigAjaxSingle,
            getConfigAjaxMultiple: getConfigAjaxMultiple
        };

        return service;

        function getConfigSingle(config) {
            return {
                mode: 'id',
                id: 'id' in config ? config.id : defaultId,
                text: 'name' in config ? config.name : defaultName,
                options: 'options' in config ? config.options : [],
                select2: getSelect2Options(config)
            };
        }

        function getConfigAjaxSingle(config) {
            assertAjaxConfigParms(config, 'getConfigAjaxSingle');

            var newConfig = getNewConfig(config);
            newConfig.mode = 'id';
            newConfig.textLookup = function (id) {
                return apiGetById(id, newConfig);
            };
            newConfig.options = function (searchText) {
                return apiSearch(searchText, newConfig);
            };

            return newConfig;
        }

        function getConfigAjaxMultiple(config) {
            assertAjaxConfigParms(config, 'getConfigAjaxMultiple');

            var newConfig = getNewConfig(config);
            newConfig.mode = 'tags-id';
            newConfig.textLookup = function (id) {
                return apiGetById(id, newConfig);
            };
            newConfig.options = function (searchText) {
                return apiSearch(searchText, newConfig);
            };

            return newConfig;
        }

        function getNewConfig(config) {
            return {
                id: 'id' in config ? config.id : defaultId,
                text: 'name' in config ? config.name : defaultName,
                select2: getSelect2Options(config),
                apiGetMethod: 'apiGetMethod' in config ? config.apiGetMethod : undefined,
                apiSearchMethod: 'apiSearchMethod' in config ? config.apiSearchMethod : undefined
            };
        }

        function assertAjaxConfigParms(config, methodName) {
            if (angular.isUndefined(config.apiGetMethod)) {
                throw new Error('apiGetMethod required in ' + methodName + ' method of aaSelectService.');
            }
            if (angular.isUndefined(config.apiSearchMethod)) {
                throw new Error('apiSearchMethod required in ' + methodName + ' method of aaSelectService.');
            }
        }

        function apiSearch(searchText, config) {
            //search for options with AJAX
            var parms = { searchText: searchText };

            return $http.get('api/Lookup/' + config.apiSearchMethod, parms);
        }

        function apiGetById(id, config) {
            //find the text for the selected id
            //looks at 'text' field above (name)
            return $http.get('api/Lookup/' + config.apiGetMethod, { id: id });
        }

        // Select2 options that can be added. See here (http://ivaynberg.github.io/select2/index.html) for more possible options.
        function getSelect2Options(config) {
            return {
                allowClear: 'allowClear' in config ? config.allowClear : true,
                minimumInputLength: 'minimumInputLength' in config ? config.minimumInputLength : 0,
                maximumInputLength: 'maximumInputLength' in config ? config.maximumInputLength : undefined,
                placeholder: 'placeholder' in config ? config.placeholder : 'Select...'
            };
        }
    }
})();