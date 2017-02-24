const angular = require('angular');
const ngModule = angular.module('app', []);

require('./main.scss');
require('./components/header')(ngModule);
