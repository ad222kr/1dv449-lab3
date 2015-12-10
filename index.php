<?php

require_once("Models/WebServices/SwedishRadioWebService.php");

$srws = new SwedishRadioWebService();

$srws->getTrafficData();