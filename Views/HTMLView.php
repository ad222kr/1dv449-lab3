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
        <header>
            <div class="container">
                <!-- Static navbar -->
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Trafikinformation från Sveriges Radio</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <div class="nav navbar-nav navbar-right">
              <p class="navbar-brand">1dv449</p>
            </div>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>
             </div>
         </header>

        <div class="map"></div>
        <div class="container">
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

        <footer>

        </footer>
        <script src="lib/leaflet/leaflet.js"></script>
        <script src="Scripts/App.js"></script>
    </body>
</html>
                ';
    }
}
