<?php

class SwedishRadioWebService {

    private static $cachedFileHandle = "trafficinfo.json";
    private static $cacheTime = 600; // 10 mins

    public function getTrafficData() {
        if (!file_exists(self::$cachedFileHandle)) {
            $rawJson = $this->makeApiRequest();
            file_put_contents(self::$cachedFileHandle, $rawJson);
            return $rawJson;
        }

        if ($this->cacheIsFresh())
            return file_get_contents(self::$cachedFileHandle);
        else
            return $this->makeApiRequest();

    }

    private function cacheIsFresh() {
        return file_exists(self::$cachedFileHandle) &&
              (filemtime(self::$cachedFileHandle) > time() - self::$cacheTime);
    }

    private function makeApiRequest() {
        $options = array(
            CURLOPT_URL => "http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false",
            CURLOPT_RETURNTRANSFER => TRUE
        );
        $ch = curl_init();
        curl_setopt_array($ch, $options);
        $rawJson = curl_exec($ch);
        curl_close($ch);

        // cache data
        file_put_contents(self::$cachedFileHandle, $rawJson);

        return $rawJson;
    }
}