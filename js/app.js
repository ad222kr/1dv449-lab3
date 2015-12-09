var App = App || {};

App.run = function () {
    "use strict";



    var sho = new App.SwedishRadioWebService();
    sho.getTrafficData();


};

window.onload = App.run();
