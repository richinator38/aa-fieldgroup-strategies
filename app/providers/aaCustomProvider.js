(function () {
    'use strict';

    angular.module('aaCustomProviders', [])
        .provider('aaCustom', function aaCustomProvider(aaFormExtensionsProvider, $injector) {
            var service = {
            };

            this.initProvider = function () {
                aaFormExtensionsProvider.defaultOnNavigateAwayStrategy = "None";

                initLabelStrategies();
                initFieldGroupStrategies();
                initSpinnerClickStrategies();
            };

            function getLabelCol(element) {
                return element.attr('aa-lbl-col') || "sm-3";
            }

            function initLabelStrategies() {
                aaFormExtensionsProvider.defaultLabelStrategy = "defaultStrategy";
                aaFormExtensionsProvider.labelStrategies.defaultStrategy = function (element, labelText, isRequired) {
                    var fgsElement = element.attr('aa-field-group-strategy');
                    if (!angular.isUndefined(fgsElement) && fgsElement.length > 0) {
                        if (fgsElement === 'checkBox') {
                                return;
                        }
                    }

                    var col = getLabelCol(element);
                    var class_ = element.attr('aa-lbl-class') || 'form-label';

                    var label = angular.element('<label>')
                      .attr('for', element[0].id)
                      .addClass('col-' + col + ' control-label ' + class_)
                      .html(labelText + (isRequired ? '&nbsp;*' : ''));

                    var unsupported = [
                      'button',
                      'submit'
                    ];

                    if (unsupported.indexOf(element[0].type) !== -1) {
                        throw new Error("Generating a label for and input type " + element[0].type + " is unsupported.");
                    }

                    var formGrp = $(element).closest('.form-group');
                    if (!angular.isUndefined(formGrp) && formGrp !== null) {
                        formGrp.prepend(label);
                    }
                }
            }

            function initFieldGroupStrategies() {
                initDefaultFGS();
                initCurrencyFGS();
                initDatePickerFGS();
                initCheckboxFGS();
                initSelect2FGS();
                initRadioFGS();
            }

            function commonFGSAlter(element) {
                //add form-control if it is missing
                if (!element.prop('class')) {
                    element.addClass('form-control');
                }

                var lblCol = getLabelCol(element);
                var col = element.attr('aa-col') || "sm-5";
                var ngshow = element.attr('ng-show') || '';
                if (ngshow.length > 0) {
                    ngshow = 'ng-show="' + ngshow + '"';
                }
                var lblClass = element.attr('aa-lbl-class') || 'form-label';

                return {
                    aaCol: col,
                    aaLblCol: lblCol,
                    ngShow: ngshow,
                    lblClass: lblClass,
                    defaultWrapper: '<div class="form-group" ' + ngshow + '><div class="col-' + col + '"><input/></div></div>'
                };
            }

            function initDefaultFGS() {
                aaFormExtensionsProvider.defaultFieldGroupStrategy = "defaultFGS";
                aaFormExtensionsProvider.fieldGroupStrategies.defaultFGS = function (element) {
                    var attrs = commonFGSAlter(element);

                    wrap(element, attrs.defaultWrapper);
                };
            }

            function initCurrencyFGS() {
                aaFormExtensionsProvider.fieldGroupStrategies.currency = function (element) {
                    var attrs = commonFGSAlter(element);

                    element.attr('aa-currency', '');

                    wrap(element, attrs.defaultWrapper);
                };
            }

            function initCheckboxFGS() {
                aaFormExtensionsProvider.fieldGroupStrategies.checkBox = function (element) {
                    var attrs = commonFGSAlter(element);

                    element.attr('aa-checkbox', '');
                    element.attr('type', 'checkbox');

                    wrap(element, '<div class="form-group" ' + attrs.ngShow + '><div class="col-' + attrs.aaLblCol + '"></div><div class="checkbox col-' +
                        attrs.aaCol + '"><input/></div></div>');
                };
            }

            function initSelect2FGS() {
                aaFormExtensionsProvider.fieldGroupStrategies.select2 = function (element) {
                    var attrs = commonFGSAlter(element);

                    element.attr('aa-select-two', '');
                    element.attr('aa-select2', element.attr('config'));
                    element.attr('style', 'width:100%');

                    wrap(element, attrs.defaultWrapper);
                };
            }

            var rootScope;

            function initRadioFGS() {
                aaFormExtensionsProvider.fieldGroupStrategies.radio = function (element) {
                    var attrs = commonFGSAlter(element);

                    element.attr('aa-radio-group', '');
                    element.attr('type', 'radio');
                    element.attr('ng-if', '$first');
                    element.attr('ng-change', 'activate(opt, $event)');
                    element.attr('ng-value', 'opt.id');

                    wrap(element, '<div class="form-group" ' + attrs.ngShow + '><div class="radio-update col-' + attrs.aaCol + '"><label class="radio-inline" ng-repeat="opt in ' + element.attr('options') + '">' +
                        '<input/></label></div></div>');

                    var firstSpan = ' <span ng-if="$first">{{opt.name}}</span>';
                    $(element).after(angular.element(firstSpan));

                    var name = element.attr('name');
                    var requiredMsg = element.attr('required-msg');
                    var required = element.attr('required');
                    var ngrequired = element.attr('ng-required');
                    var isRequired = (!angular.isUndefined(requiredMsg) && requiredMsg.length > 0) ||
                        (!angular.isUndefined(required) && required.length > 0) ||
                        (!angular.isUndefined(ngrequired) && ngrequired.length > 0);
                    if (isRequired && angular.isUndefined(requiredMsg) || requiredMsg.length == 0) {
                        requiredMsg = name + ' is required.';
                    }
                    var reqdText = isRequired ? 'required required-msg="' + requiredMsg + '"' : '';

                    var secondInput = '<input type="radio" name=' + element.attr('name') + ' ng-if="!$first" ng-change="activate(opt, $event)" ng-model="' + element.attr('aa-field') + '" ng-value="opt.id" ' + reqdText + ' /> <span ng-if="!$first">{{opt.name}}</span>';
                    $(element).after(angular.element(secondInput));
                };
            }

            function initDatePickerFGS() {
                aaFormExtensionsProvider.fieldGroupStrategies.datePicker = function (element) {
                    var attrs = commonFGSAlter(element);

                    element.attr('aa-date-picker', '');
                    element.attr('datepicker-popup', '{{locale.dateFormat}}');
                    element.attr('is-open', 'opened');

                    wrap(element, attrs.defaultWrapper);
                };
            }

            function wrap(elms, wrapper) {
                var wrapperDiv = document.createElement('div');
                wrapperDiv.innerHTML = wrapper;

                if (!elms.length) {
                    elms = [elms];
                }

                for (var i = elms.length - 1; i >= 0; i--) {
                    var el = elms[i];

                    var child = wrapperDiv.firstChild.cloneNode(true);
                    var inputElement = $(child).find('input');
                    if (angular.isUndefined(inputElement) || inputElement.length == 0) {
                        throw Error('>> input element required for field group strategy.');
                    }

                    var parent = el.parentNode;
                    var sibling = el.nextSibling;

                    inputElement.replaceWith(el);

                    if (sibling) {
                        parent.insertBefore(child, sibling);
                    } else {
                        parent.appendChild(child);
                    }
                }
            }

            function initSpinnerClickStrategies() {
                aaFormExtensionsProvider.defaultSpinnerClickStrategy = "fwSpinnerClickStrategy";
                aaFormExtensionsProvider.spinnerClickStrategies = {
                    fwSpinnerClickStrategy: function (buttonElement) {

                        var loading = angular.element('<i style="margin-left: 5px;" class="fa fa-spinner fa-spin"></i>');

                        // This will be disabled after load is finished since it was happening too fast with the after method below.
                        return {
                            before: function () {
                                buttonElement.prop("disabled", true);
                                buttonElement.append(loading);
                            }
                        };
                    }
                };
            }

            this.$get = function aaCustomFactory($rootScope) {
                rootScope = $rootScope;
                return service;
            };
        });
})();