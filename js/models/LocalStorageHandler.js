/**
 * Simple "caching" using localstorage, heavily influenced by
 * http://stackoverflow.com/questions/2326943/when-do-items-in-html5-local-storage-expire/17632458#17632458
 */

var App = App || {};
App.LocalStorageHandler = function () {

};

App.LocalStorageHandler.prototype = {

    setStorage: function(name, value, expires) {
        "use strict";
        var date = new Date();
        var expirationTime = Math.round((date.setSeconds(date.getSeconds() + expires))/1000);

        localStorage.setItem(name, value);
        localStorage.setItem(name + "_time", expirationTime);
    },

    removeStorage: function (name) {
        "use strict";
        localStorage.removeItem(name);
        localStorage.removeItem(name + "_time");
    },

    isExpired: function(name) {
        "use strict";
        var date = new Date();
        var current = +date/1000;
        var storeTime = localStorage.getItem(name + "_time");

        if (storeTime < current) {
            this.removeStorage(name);
            return true;
        } else {
            return false;
        }
    }
}
