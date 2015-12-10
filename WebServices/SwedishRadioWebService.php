<?php

class SwedishRadioWebService {

    private static $cachedFileHandle = "trafficinfo.json";
    private static $cacheTime = 10 * 60; // 10 mins

    public function getTrafficData() {
        if (!file_exists(self::$cachedFileHandle)) {
            $rawJson = $this->makeApiRequest();
            file_put_contents(self::$cachedFileHandle, $rawJson);
            echo "file did not exist";
            return $rawJson;
        }

        if ($this->cacheIsFresh()) {
            echo "cache is fresh, return cache";
            return file_get_contents(self::$cachedFileHandle);
        } else {
            echo "cache was not fresh, get new cache";
            return $this->makeApiRequest();
        }
    }

    private function cacheIsFresh() {
        return file_exists(self::$cachedFileHandle) && (filemtime(self::$cachedFileHandle) > time() - self::$cacheTime);
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