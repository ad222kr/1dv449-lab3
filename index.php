<?php

require_once("Models/WebServices/SwedishRadioWebService.php");

$srws = new \models\SwedishRadioWebService();

$srws->getTrafficData();