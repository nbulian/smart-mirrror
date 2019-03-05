app.service('MapService', function() {
    var service = {};
    service.center = config.map.locaiton; //default map locaiton
    service.zoom = config.map.zoom; //default zoom

    this.generateMap = function (targetCenter, targetZoom) {
        if (targetCenter === undefined) {
            targetCenter = service.center;
        } else {
            //when we change the center of the map keep track of it
            service.center = targetCenter;
        }
        if (targetZoom === undefined) {
            targetZoom = service.zoom;
        }
        return "https://maps.googleapis.com/maps/api/staticmap?center=" + targetCenter + "&zoom=" + targetZoom +
            "&format=png&sensor=false&scale=2&size=" + window.innerWidth +
            "x1200&maptype=roadmap&style=visibility:on|weight:1|invert_lightness:true|saturation:-100|lightness:1" + 
            "&key=" + config.map.key;
    };

    this.showNewMap = function (place) {
        return this.generateMap(place, 6);
    };

    this.zoomIn = function () {
        service.zoom = service.zoom + 1;
        return this.generateMap(service.center);
    };

    this.zoomTo = function (value) {
        if (0 + value < 0 || value == "zero") {
            value = 0
        } else if (0 + value > 18) {
            value = 18
        }
        service.zoom = value;
        return this.generateMap(service.center);
    };

    this.zoomOut = function () {
        service.zoom = service.zoom - 1;
        return this.generateMap(service.center);
    };

    this.reset = function () {
        service.zoom = config.map.zoom;
        return this.generateMap(service.center);
    };

    return this;

});