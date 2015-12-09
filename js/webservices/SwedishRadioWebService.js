var App = App || {};

App.SwedishRadioWebService = function() {
    "use strict";

    var URL = "http://api.sr.se/api/v2/traffic/messages";
    var localStorageHandler = new App.LocalStorageHandler();
    var storageName = "trafficInformation";

    this.getTrafficData = function() {
        makeRequest();
    };

    var makeRequest = function() {


        console.log(localStorage.getItem("trafficInformation"));
        console.log(localStorage.getItem("trafficInformation_time"));
        console.log(Date.now() / 1000);
    };

    var handleResponse = function(data) {
    };


}


