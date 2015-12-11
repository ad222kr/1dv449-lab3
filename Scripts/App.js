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
  maxZoom: 15,
  layers: {
    url: "https://api.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token={accessToken}",
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    accessToken: "pk.eyJ1IjoiYmVuZ3Rib3hhcmUiLCJhIjoiY2lpMHZjZ2U0MDU0NHQzbTFvcWdjdHoyaCJ9._0Ukq83Y0d8qzjb1sM7gmg"

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
  }
};

TrafficApp.run = function() {
  "use strict";
  var map = TrafficApp.initMap();
  var categories = document.querySelector("#categories");

  TrafficApp.makeAjaxRequest(function() {
    var messages = JSON.parse(this.responseText).messages;

    messages.forEach(function(elem) {
      elem.createddate = TrafficApp.parseDate(elem.createddate);
      console.log(elem.createddate);
    });

    messages.sort(function(d1, d2) {
      return d2.createddate - d1.createddate;
    });

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

  var map = L.map("map").setView([TrafficApp.MAP_SETTINGS.center.x, TrafficApp.MAP_SETTINGS.center.y], TrafficApp.MAP_SETTINGS.zoom)
  L.tileLayer(TrafficApp.MAP_SETTINGS.layers.url, {
    attribution: TrafficApp.MAP_SETTINGS.layers.attribution,
    maxZoom: TrafficApp.MAP_SETTINGS.maxZoom,
    accessToken: TrafficApp.MAP_SETTINGS.layers.accessToken
  }).addTo(map);

  return map;
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
    if (xhr.readyState === 4 && xhr.status === 200 && typeof callback === "function") {
      callback.apply(xhr);
    } else {
      console.log("Något gick fel, " + xhr.status);
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
    var date = TrafficApp.formatDate(element.createddate);
    var categoryDescription = TrafficApp.CATEGORY.getDescription(element.category);
    var popupText =
      "<h4>" + element.title + "</h4>" +
      "<div><b>Beskrivning: </b>" + element.description + "</div>" +
      "<div><b>Kategori: </b>" + categoryDescription + "</div>" +
      "<div><b>Underkategori: </b>" + element.subcategory + "</div>" +
      "<div><b>Datum: </b>" + date + "</div>";

    var marker = L.marker([element.latitude, element.longitude])
      .addTo(map)
      .bindPopup(popupText);

    var buttonDiv = document.createElement("div");
    var titleLink = document.createElement("a");
    buttonDiv.appendChild(titleLink);
    titleLink.href = "#";
    titleLink.classList.add("btn");
    titleLink.classList.add("btn-default");
    titleLink.classList.add("btn-block");
    titleLink.classList.add("btn-xs");
    titleLink.innerHTML = "<h4>" + element.title + "</h4>";

    information.appendChild(buttonDiv);
    titleLink.addEventListener("click", function() {
      marker.openPopup();
      map.setView([element.latitude, element.longitude], 12);
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

  return new Date(millis);

};

TrafficApp.formatDate = function(date) {
  "use strict";
  var monthNames = [
    "Januari", "Februari", "Mars", "April",
    "Maj", "Juni", "Juli", "Augusti",
    "September", "Oktober", "November", "December"
  ];
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();

  return day + " " + monthNames[month] + " " + year + " " + hour + ":" + (minute < 10 ? "0" + minute : minute);
};

window.onload = TrafficApp.run;
