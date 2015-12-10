/*global L:false, console:false */

var TrafficApp = TrafficApp || {};

TrafficApp.URL_TO_JSON = "trafficinfo.json";

TrafficApp.markers = [];

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
    "1": "Mycket Allvarlig Händelse",
    "2": "Stor händelse",
    "3": "Störning",
    "4": "Information",
    "5": "Mindre störning"
};

TrafficApp.CATEGORY = {
    ROAD: 0,
    COLLECTIVE: 1,
    PLANNED: 2,
    OTHER: 3,
    ALL: 4,

    getDescription: function(value) {
        "use strict";
        switch (value) {
            case TrafficApp.CATEGORY.ROAD:
                return "Vägtrafik";
            case TrafficApp.CATEGORY.COLLECTIVE:
                return "Kollektivtrafik";
            case TrafficApp.CATEGORY.PLANNED:
                return "Planerad störning";
            case TrafficApp.CATEGORY.OTHER:
                return "Övrigt";
        }
    },
};

TrafficApp.run = function() {
    "use strict";
    var map = TrafficApp.initMap();
    var categories = document.querySelector("#categories");

    TrafficApp.makeAjaxRequest(function() {
        var messages = JSON.parse(this.responseText).messages;

        TrafficApp.drawMarkers(messages, map, TrafficApp.CATEGORY.ALL);

        categories.addEventListener("change", function() {
            TrafficApp.drawMarkers(messages, map, parseInt(categories.value));
        });
    }, TrafficApp.URL_TO_JSON);
};


/**
 * @return a leaflet-map
 */
TrafficApp.initMap = function() {
    "use strict";
    return L.map('map', {
        'center': [TrafficApp.MAP_SETTINGS.center.x, TrafficApp.MAP_SETTINGS.center.y],
        'zoom': TrafficApp.MAP_SETTINGS.zoom,
        'layers': [
            L.tileLayer(TrafficApp.MAP_SETTINGS.layers.url, {
                'attribution': TrafficApp.MAP_SETTINGS.layers.attribution
            })]
    });
};

/**
 *
 * @param callback - to execute on completion
 * @param url
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
 *
 * @param messages - messages about traffic information
 * @param map - instance of the leaflet-map
 * @param category - to filter on, OPTIONAL
 */
TrafficApp.drawMarkers = function(messages, map, category) {
    "use strict";
    var information = document.querySelector(".information");
    console.log(information);

    // clear markers if any exists
    if (TrafficApp.markers.length > 0) {
        TrafficApp.markers.forEach(function(element) {
            map.removeLayer(element);
        });
        TrafficApp.markers = [];

        // clear text aswell
        while(information.firstChild) {
            information.removeChild(information.firstChild);
        }
    }
    if (category !== TrafficApp.CATEGORY.ALL) {
        messages = TrafficApp.filterTrafficInformation(messages, category);
    }

    messages.forEach(function(element) {
        var parsedDate = TrafficApp.parseDate(element.createddate);
        var categoryDescription = TrafficApp.CATEGORY.getDescription(element.category);
        var popupText =
            "<h4>" + element.title + "</h4>" +
            "<div><b>Beskrivning: </b>" + element.description + "</div>" +
            "<div><b>Kategori: </b>" + categoryDescription + "</div>" +
            "<div><b>Underkategori: </b>" + element.subcategory + "</div>" +
            "<div><b>Datum: </b>" + parsedDate + "</div>";

        var marker = L.marker([element.latitude, element.longitude])
          .addTo(map)
          .bindPopup(popupText);

        var info = document.createElement("a");
        info.href = "#";
        info.innerHTML = popupText;
        information.appendChild(info);

        info.addEventListener("click", function() {
            marker.openPopup();
        });

        TrafficApp.markers.push(marker);
    });
};


TrafficApp.filterTrafficInformation = function(messages, filterCategory) {
    "use strict";
    return messages.filter(function (element) {
        return element.category === filterCategory;
    });

};

TrafficApp.parseDate = function(dateString) {
    "use strict";
    var millis = parseInt(dateString.substring(6, dateString.length - 7));
    var monthNames = [
        "Januari", "Februari", "Mars", "April",
        "Maj", "Juni", "Juli", "Augusti",
        "September", "Oktober", "November", "December"
    ]
    var date = new Date(millis);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();

    return day + " " + monthNames[month] + " " + year + " " + hour + ":" + minute;
};

window.onload = TrafficApp.run;
