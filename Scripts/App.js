/*global L:false, console:false */

var TrafficApp = TrafficApp || {};

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

TrafficApp.urlToJson = "http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false";

TrafficApp.run = function() {
    "use strict";
    var map = TrafficApp.initMap();
    TrafficApp.makeAjaxRequest(function() {
        var response = JSON.parse(this.responseText);
        TrafficApp.drawMarkers(response, map);
    });
};

/**
 * Initates the map and returns it
 */
TrafficApp.initMap = function() {
    "use strict";
    var map = L.map('map', {
        'center': [TrafficApp.mapSettings.center.x, TrafficApp.mapSettings.center.y],
        'zoom': TrafficApp.mapSettings.zoom,
        'layers': [
            L.tileLayer(TrafficApp.mapSettings.layers.url, {
                'attribution': TrafficApp.mapSettings.layers.attribution
            })
        ]

    });

    return map;
};

TrafficApp.makeAjaxRequest = function(callback) {
    "use strict";
    var xhr = new XMLHttpRequest();
    var data;

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

TrafficApp.drawMarkers = function(trafficInfo, map) {
    "use strict";

    console.log(map);
    trafficInfo.messages.forEach(function(element, index) {
        console.log(element.latitude);
        L.marker([element.latitude, element.longitude]).addTo(map)
          .bindPopup("some popupdata here :D");
    });
}



/*var App = {
    map: null,

    run: function() {
        "use strict";


        App.map =





        App.getTrafficInformation();


    },

    getTrafficInformation: function() {

    },

    foo: function() {
        console.log("bar");
    }
};

*/

window.onload = TrafficApp.run;




