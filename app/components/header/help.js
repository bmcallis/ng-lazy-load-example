export default ngModule => {
    ngModule.factory('help', function($rootScope, ngDialog) {
        require('ng-dialog/css/ngDialog.min.css');
        require('ng-dialog/css/ngDialog-theme-default.min.css');
        require('./help.scss');

        const dialogScope = $rootScope.$new();
        dialogScope.help = {
            messages: [
                'This is a help message',
                'This is a help message',
                'These are all helpful messages',
            ],
        };

        function showHelpDialog() {
            dialogScope.help.dialog = ngDialog.open({
                template: require('./help.html'),
                plain: true,
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: true,
                showClose: true,
                scope: dialogScope,
                height: 400,
                width: 320,
            });
        }

        return {
            showHelpDialog: showHelpDialog,
        };
    });
}
