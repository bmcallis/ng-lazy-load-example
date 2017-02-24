export default ngModule => {
    ngModule.directive('map', function() {
        const L = require('leaflet');
        require('leaflet/dist/leaflet.css');
        require('./map.scss');

        return {
            restrict: 'E',
            template: require('./map.html'),
            scope: {},
            controllerAs: 'ctrl',
            controller: function() {
                const ctrl = this;
                const osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: ''});
                const map = new L.Map('map', {
                  layers: [osm],
                  center: new L.LatLng(51.505, -0.04),
                  zoom: 13
                });

            }
        }
    });
}
