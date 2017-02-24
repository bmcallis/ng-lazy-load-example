require('ng-dialog');

const angular = require('angular');
const ngModule = angular.module('app', ['ngDialog']);

require('./main.scss');
require('./components/header')(ngModule);
require('./components/map')(ngModule);

ngModule.config(['ngDialogProvider', function(ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default'
    });
}]);
