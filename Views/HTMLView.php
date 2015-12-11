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

        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="lib/leaflet/leaflet.css" />
        <link rel="stylesheet" href="Css/site.css" />
    </head>

    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">

          <a class="navbar-brand" href="#">Trafikinformation</a>
        </div>
        
      </div>
    </nav>


        <div class="container">
        <div class="cont">
          <div class="map"></div>
              <div class="row">
                   <div class="col-md-8 map-area"><div id="map"></div></div>
                   <div class="col-md-4 info-area">
                       <div class="form-horizontal">
                           <div class="form-group">
                              <label for="categories" class="col-sm-4 control-label">Välj kategori</label>
                              <div class="col-sm-8">
                                  <select id = "categories" class="dropdown form-control">
                                     <option selected="selected" value="4">Alla</option>
                                     <option value = "0">Vägtrafik</option>
                                     <option value = "1">Kollektivtrafik</option>
                                     <option value = "2">Planerad störning</option>
                                     <option value = "3">Övrigt</option>
                                  </select>
                              </div>
                          </div>
                          <div class="information">
                          </div>
                      </div>
                   </div>
              </div>
</div>
        </div>

        <footer>

        </footer>
        <script src="lib/leaflet/leaflet.js"></script>
        <script src="Scripts/App.js"></script>
    </body>
</html>
                ';
    }
}
