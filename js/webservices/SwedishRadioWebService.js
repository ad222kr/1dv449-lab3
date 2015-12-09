/**
 * @constructor
 */
function SwedishRadioWebService() {
    "use strict";

    /**
     * Members
     */
    var URL = "http://api.sr.se/api/v2/traffic/messages";

    var requestParams = {
        format: "json",
        pagination: "false"
    };

    /**
     * Public
     */
    this.getTrafficData = function() {
        makeRequest();
    };

    /**
     * Private
     */

    var makeRequest = function() {
        var json = $.ajax({
            type: "GET",
            url: URL,
            data: requestParams,
            success: function (data) {
                handleResponse(data);
            }

        });
    };

    var handleResponse = function(data) {
        document.write(data);
    };


}


