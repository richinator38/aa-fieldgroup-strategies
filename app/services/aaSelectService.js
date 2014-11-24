(function () {
    'use strict';

    angular
        .module('app')
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
                id: defaultId in config ? config.id : defaultId,
                text: defaultName in config ? config.name : defaultName,
                options: 'options' in config ? config.options : [],
                select2: getSelect2Options(config)
        };
        }

        function getConfigAjaxSingle(config) {
            assertAjaxConfigParms(config, 'getConfigAjaxSingle');

            return {
                mode: 'id',
                id: defaultId in config ? config.id : defaultId,
                text: defaultName in config ? config.name : defaultName,
                textLookup: function (id) {
                    return apiGetById(id, config);
                },
                options: function (searchText) {
                    return apiSearch(searchText, config);
                },
                select2: getSelect2Options(config)
        };
        }

        function getConfigAjaxMultiple(config) {
            assertAjaxConfigParms(config, 'getConfigAjaxMultiple');

            return {
                mode: 'tags-id',
                id: defaultId in config ? config.id : defaultId,
                text: defaultName in config ? config.name : defaultName,
                textLookup: function (id) {
                    return apiGetById(id, config);
                },
                options: function (searchText) {
                    return apiSearch(searchText, config);
                },
                select2: getSelect2Options(config)
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
            return $http.get('api/Lookup/' + config.apiSearchMethod, { searchText: searchText });
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
                placeholder: 'placeholder' in config ? config.placeholder : 'Select..'
            };
        }
    }
})();