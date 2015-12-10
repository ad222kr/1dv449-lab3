<?php

require_once("WebServices/SwedishRadioWebService.php");
require_once("Views/HTMLView.php");

$srws = new SwedishRadioWebService();

$srws->getTrafficData();
$v = new HTMLView();
$v->render();