/*global L:false, console:false */

var TrafficApp = TrafficApp || {};

/**
 * Settings for the map
 * @type {{center: {x: number, y: number}, zoom: number, layers: {url: string, attribution: string}}}
 */
TrafficApp.mapSettings = {
    center: {
        x: 63,
        y: 17
    },
    zoom: 5,
    layers: {
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: 'Map data &copy; OpenStreetMap contributors'
    }
};

TrafficApp.urlToJson = "trafficinfo.json";

TrafficApp.run = function() {
    "use strict";
    var map = TrafficApp.initMap();

    TrafficApp.makeAjaxRequest(function() {
        var response = JSON.parse(this.responseText);
        TrafficApp.drawMarkers(response, map);
    });
};

/**
 * @return a leaflet-map
 */
TrafficApp.initMap = function() {
    "use strict";
    var map = L.map('map', {
        'center': [TrafficApp.mapSettings.center.x, TrafficApp.mapSettings.center.y],
        'zoom': TrafficApp.mapSettings.zoom,
        'layers': [
            L.tileLayer(TrafficApp.mapSettings.layers.url, {
                'attribution': TrafficApp.mapSettings.layers.attribution
            })]
    });

    return map;
};

/**
 * @param callback - callback function to execute when request is done
 */
TrafficApp.makeAjaxRequest = function(callback) {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && typeof callback === "function") {
                callback.apply(xhr);

            } else {
                console.log("läsfel, status: " + xhr.status);
            }
        }
    };

    xhr.open("GET", TrafficApp.urlToJson, true);
    xhr.send(null);
};

/**
 * @param trafficInfo - object containing the trafficInformation from SR
 * @param map - a leaflet map object
 */
TrafficApp.drawMarkers = function(trafficInfo, map) {
    "use strict";

    console.log(map);
    trafficInfo.messages.forEach(function(element, index) {
        console.log(element.latitude);
        L.marker([element.latitude, element.longitude]).addTo(map)
          .bindPopup("some popupdata here :D");
    });
}



window.onload = TrafficApp.run;




