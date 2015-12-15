# 1dv449-lab3 
## Reflektion
### Vad finns det för krav du måste anpassa dig efter i de olika API:erna?  
Sveriges Radios API var öppet att använda, det behövdes ingen API-nyckel för att komma åt datat.
För att rita ut kartan använde jag mig utan [MapBox](https://www.mapbox.com/). Där krävdes det att man registrerade sig
och använde en API-nyckel. Det var dock relativt lätt och tog endast några sekunder att fixa.

### Hur och hur länge cachar du ditt data för att slippa anropa API:et i onödan?
Tiles frå Mapbox cacheas i webbläsaren automatiskt via Cache-control header i http-anropet. Det är dock otillåtet att
cachea tiles på sin server för användning, men i slutanvändarens webbläsare går det bra.  
Datat från SR's API hämtar jag via php och cachar det i en json-fil som klienten sedan gör anrop mot. Datat cachas i 10 minuter,
sedan hämtas färskt data igen. 10 minuter känns som en rimlig tid för trafikinformation, eftersom man aldrig vet när en olycka är framme.

### Vad finns det för säkerhetsrisker och stabilitet i din applikation?
Självklart finns det en risk när man gör anorp mot ett API. Skulle SR's API bli kompromissat med skadlig kod skulle även min applikation
drabbas.

### Hur har du tänkt kring säkerhet i din applikation?
Då applikationen inte använder några formulär så finns det ingen risk för SQL-injections, XSS-attacker eller CSRF-attacker.


### Hur har du tänkt kring optimering i din applikation?
Javascript-filer längst ner i body-taggen. CSS länkas in i head-taggen. Jag har använt den minifierade versionen av bootstrap för 
att få mindre storlek på requests. Jag borde även ha miniferat mitt egna script.
