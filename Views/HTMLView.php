<?php

/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 2015-12-10
 * Time: 15:02
 */
class HTMLView {
    public function render() {
        echo
        '
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Webteknik 2 - Lab 3</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css" />
        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap-theme.css" />
        <link rel="stylesheet" href="lib/leaflet/leaflet.css" />
        <link rel="stylesheet" href="css/site.css" />
    </head>

    <body>
        <header>

        </header>

        <div class="map"></div>
        <div class="container">
            <div class="row">
                 <div class="col-md-8 map-area"><div id="map"></div></div>
                 <div class="col-md-4 info-area">

                 </div>
            </div>

        </div>

        <footer>

        </footer>
        <script src="lib/leaflet/leaflet.js"></script>
        <script src="scripts/App.js"></script>
    </body>
</html>
                ';
    }
}