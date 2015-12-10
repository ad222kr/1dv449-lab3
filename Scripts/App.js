/*global L:false, console:false */

var TrafficApp = TrafficApp || {};

/**
 * Settings for the map
 * @type {{center: {x: number, y: number}, zoom: number, layers: {url: string, attribution: string}}}
 */
TrafficApp.MAP_SETTINGS = {
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

TrafficApp.PRIORITY = {
    1: "Mycket Allvarlig Händelse",
    2: "Stor händelse",
    3: "Störning",
    4: "Information",
    5: "Mindre störning"
};

TrafficApp.CATEGORY = {
    0: "Vägtrafik",
    1: "Kollektivtrafik",
    2: "Planerad störning",
    3: "Övrigt"
};

TrafficApp.URL_TO_JSON = "trafficinfo.json";

TrafficApp.run = function() {
    "use strict";
    var map = TrafficApp.initMap();

    console.log(TrafficApp.CATEGORY["0"]);
    
    TrafficApp.makeAjaxRequest(function() {
        var response = JSON.parse(this.responseText);
        TrafficApp.drawMarkers(response.messages, map);
    }, TrafficApp.URL_TO_JSON);
};

/**
 * @return a leaflet-map
 */
TrafficApp.initMap = function() {
    "use strict";
    var map = L.map('map', {
        'center': [TrafficApp.MAP_SETTINGS.center.x, TrafficApp.MAP_SETTINGS.center.y],
        'zoom': TrafficApp.MAP_SETTINGS.zoom,
        'layers': [
            L.tileLayer(TrafficApp.MAP_SETTINGS.layers.url, {
                'attribution': TrafficApp.MAP_SETTINGS.layers.attribution
            })]
    });

    return map;
};

/**
 * @param callback - callback function to execute when request is done
 */
TrafficApp.makeAjaxRequest = function(callback, url) {
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

    xhr.open("GET", url, true);
    xhr.send(null);
};

/**
 * @param trafficInfo - object containing the trafficInformation from SR
 * @param map - a leaflet map object
 */
TrafficApp.drawMarkers = function(messages, map, category) {
    "use strict";

    if (category && typeof category === "number") {
        messages = TrafficApp.filterTrafficInformation(messages, category);
    }
    messages.forEach(function(element) {
        var popupText = "<div>Titel: " + element.title + "</div>" +
                        "<div>Beskrivning: " + element.description + "</div>" +
                        "<div>Kategori: " + TrafficApp.CATEGORY[element.category] + "</div>" +
                        "<div>Underkategori: " + element.subcategory + "</div>" +
                        "<div>Datum: " + element.createddate + "</div>"; // parse date here todo

        L.marker([element.latitude, element.longitude]).addTo(map)
            .bindPopup(popupText);
    });
};

TrafficApp.filterTrafficInformation = function(messages, filterCategory) {
    "use strict";
    console.log(messages);
    var ret = messages.filter(function(element) {
       return element.category === filterCategory;
    });

    return ret;
}



window.onload = TrafficApp.run;




