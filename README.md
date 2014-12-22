# aa-fieldgroup-strategies

## Custom field group strategies for [Angular Agility](https://github.com/AngularAgility/AngularAgility)

- Checkbox
- Currency control
- Datepicker
- Percent
- Radio button group
- Select2

All are integrated with [Angular Agility's validation](http://angularagility.herokuapp.com/#/formExtensions/formExtensions/basic).

##Plunker
Sample [Plunker](http://plnkr.co/edit/rLe4N3IIsvYQupFPHR24?p=preview)

##Usage
###Checkbox
    <input aa-field-group="model.IsActive" aa-field-group-strategy="checkBox" />
###Currency
    <input aa-field-group="model.Salary" aa-field-group-strategy="currency" />
###Datepicker
    <input aa-field-group="model.BirthDate" aa-field-group-strategy="datePicker" />
###Percent
    <input aa-field-group="model.Percentage" aa-field-group-strategy="percent" />
###Radio button group
    <input aa-field-group="model.Gender" aa-field-group-strategy="radio" options="radioList" />

```javascript
$scope.radioList = [{ name: 'Male', id: 0 }, { name: 'Female', id: 1 }];
```
###Select2
    <input aa-field-group="model.State" aa-field-group-strategy="select2" config="stateSingleConfig" />

```javascript
$scope.states = [{ 'name': 'Minnesota', 'id': 'MN' }, { 'name': 'Wisconsin', 'id': 'WI' }];

$scope.stateSingleConfig = aaSelectService.getConfigSingle({
    options: $scope.states,
    placeholder: 'Select a state...'
});
```
