export default ngModule => {
    ngModule.directive('myHeader', function() {
        require('./my-header.scss');

        return {
            restrict: 'E',
            template: require('./my-header.html'),
            scope: {},
            controllerAs: 'ctrl',
            controller: function() {
                const ctrl = this;
                ctrl.title = 'My App';
            }
        }
    });
}
