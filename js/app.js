var App = App || {};

App.run = function () {
    "use strict";
    var sho = new SwedishRadioWebService();
    sho.getTrafficData();
};

window.onload = App.run();
