<?php

require_once("webservices/SwedishRadioWebService.php");
require_once("views/HTMLView.php");

$srws = new SwedishRadioWebService();

$srws->getTrafficData();
$v = new HTMLView();
$v->render();