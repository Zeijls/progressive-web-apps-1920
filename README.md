# Server Site Rendering

## Progressive Web Apps @cmda-minor-web 1819

<img width="1440" alt="overview" src="https://user-images.githubusercontent.com/45422060/76772179-beb23600-67a0-11ea-82f3-e15202dabe0f.png">)
<img width="1440" alt="detail" src="https://user-images.githubusercontent.com/45422060/76772236-d7bae700-67a0-11ea-9b8c-8f1381bbf08b.png">

## Inhoudspagina

- [Installatie](#Installatie)
- [Live Demo](#Live-Demo)
- [De opdracht](#De-opdracht)
- [Concept](#Concept)
- [API](#API)
- [Artikelen](#Artikelen)
- [Bronnenlijst](#Bronnenlijst)
- [Credits](#Credits)

### Installatie

```bash
#### Clone repository
git clone https://github.com/zeijls/progressive-web-apps-1920.git

cd progressive-web-apps-1920

#### Installeer dependencies en start de server
npm run start
```

## Live Demo

[Live Demo](https://pwa-simone.herokuapp.com/)

## Opdracht

De web aplicatie moet server side worden gerenderd. Zodra de gebruiker offline is, moet de content zichtbaar blijven. De content die de gebruiker al een keer eerder heeft bezocht kan offline beschikbaar zijn doordat het wordt opgeslagen in de cache. Aan het einde van dit project is het de bedoeling dat het concept een progressive web app is.

## Concept

Op de webapplicatie zijn alle schilderijen van Rembrandt van Rijn in het Rijksmuseum weergegeven. Zodra een schilderij wordt geselecteerd worden de details weergegeven. Als het ophalen van de schilderijen lang duurt is er een loadingstate.

## API

In deze applicatie gebruik ik de API van het Rijksmuseum. In deze API is een groot deel van de collectie van het Rijksmuseum verzameld. Alle details van de schilerderijen worden hierin weergegeven. Vanwege copyright restricties zijn kunstwerken van de 20e en 21e eeuw niet toegevoegd in deze API.

Om gebruik te maken van de API van het Rijksmuseum heb je een key nodig. Deze kun je aanvragen bij de gevanceerde account instellingen op de site van het Rijksumseum. https://www.rijksmuseum.nl/en/rijksstudio/

Ik heb alleen de schilderijen van Rembrandt van Rijn gebruikt door de volgende endpoints te gebruiken.

> const rijksAPI = baseURl + key + involvedMaker + maker;

Er bleven 9 schilderijen over. Vanaf dit punt heb ik deze schilderijen verder uitgezocht door middel van Map, Filter en Reduce.

## Server side renderen

Voor dit project moet ik mijn applicatie server side renderen. Omdat ik nog niet meteen begreep wat het verschil is met client side renderen heb ik hier een artikel over geschreven voor de Weekly Nerd.

<details>
<summary>
### Server side vs Client Side renderen </summary>

#### Inleiding

Voor het vak Progressive Web Apps gaan we een applicatie die Client Side was gerenderd ombouwen naar een server side gerenderde pagina. Om goed te kunnen begrijpen wat hier precies gebeurd wil ik weten wat nou precies het verschil is tussen deze twee manieren van renderen.

Sinds het begin van de tijd was de conventionele methode om uw HTML op een scherm te krijgen, het gebruik van server-side rendering. Het was de enige manier. U laadde uw .html-pagina's op uw server, vervolgens ging uw server en veranderde ze in nuttige documenten in de browsers van uw gebruikers. Je zou kunnen stellen dat websites tegenwoordig meer lijken op applicaties die zich voordoen als websites. Het web is gewoon een stuk geavanceerder dan vroeger.

#### Server side renderen

Hoe server-side rendering werkt
Server-side rendering is de meest gebruikelijke methode om informatie op het scherm weer te geven. Het werkt door HTML-bestanden op de server om te zetten in bruikbare informatie voor de browser.Telkens wanneer u een website bezoekt, doet uw browser een verzoek aan de server die de inhoud van de website bevat. Het verzoek duurt meestal maar een paar milliseconden, maar dat hangt uiteindelijk af van een groot aantal factoren:

- Uw internetsnelheid
- De locatie van de server
- Hoeveel gebruikers toegang tot de site proberen te krijgen
- Hoe geoptimaliseerd de website is
  (om er maar een paar te noemen)

Zodra het verzoek is verwerkt, krijgt uw browser de volledig gerenderde HTML terug en wordt deze op het scherm weergegeven. Als u vervolgens besluit om een ​​andere pagina op de website te bezoeken, zal uw browser opnieuw een verzoek om de nieuwe informatie indienen. Dit gebeurt elke keer dat u een pagina bezoekt waarvan uw browser geen gecachte versie heeft.

Het maakt niet uit of de nieuwe pagina maar een paar items heeft die anders zijn dan de huidige pagina, de browser zal om de hele nieuwe pagina vragen en alles vanaf de grond opnieuw weergeven.

#### Voordeel server side renderen

Het is super goed voor de SEO doordat de inhoud al aanwezig is voordat je hem hebt ontvangen. Hierdoor kunnen zoekmachines deze indexeren en prima doorzoeken. Dit is niet het geval bij client side renderen. (niet zo eenvoudig in iedergeval)

#### Nadeel server side renderen

Iedere pagina wordt compleet opnieuw geladen, ook al wordt er maar 1 woord aangepast. Hierdoor kan het super lang duren voordat de pagina is geladen. De website kan hier ontzettend sloom van worden.

#### Client Side renderen

Wanneer ontwikkelaars praten over rendering aan de clientzijde, hebben ze het over het renderen van inhoud in de browser met JavaScript. Dus in plaats van alle inhoud uit het HTML-document zelf te halen, krijg je een kaal HTML-document met een JavaScript-bestand dat de rest van de site via de browser zal weergeven.

Dit is een relatief nieuwe benadering voor het renderen van websites en het werd pas echt populair toen JavaScript-bibliotheken het begonnen op te nemen in hun stijl van ontwikkeling. Enkele opvallende voorbeelden zijn Vue.js en React.js.

![VB Client Side Renderen](Sketchnote,Aantekningen/ClientsideVSServerside/clientSideRenderen.png)

Er zijn een aantal grote verschillen in de werking van client side renderen. Om te beginnen, in plaats van de inhoud in het HTML-bestand te hebben, heb je een container-div met een id van root. Je hebt ook twee scriptelementen direct boven de afsluitende body-tag. Een die de Vue.js JavaScript-bibliotheek laadt en een die een bestand met de naam app.js. laadt.

Dit is radicaal anders dan het gebruik van server-side rendering omdat de server nu alleen verantwoordelijk is voor het laden van het kale minpuntje van de website. De belangrijkste boilerplate. Al het andere wordt afgehandeld door een JavaScript-bibliotheek aan de clientside, in dit geval Vue.js en aangepaste JavaScript-code.

Als je alleen met de bovenstaande code een verzoek indient bij de URL, krijgt u een leeg scherm. Er hoeft niets te worden geladen omdat de daadwerkelijke inhoud moet worden weergegeven met JavaScript.

Om dat op te lossen, plaatst u de volgende coderegels in het app.js-bestand.

![VB Client Side Renderen](Sketchnote,Aantekningen/ClientsideVSServerside/VB2Clientside.png)

Als u nu de URL bezoekt, ziet u dezelfde inhoud als in het voorbeeld aan de serverside. Het belangrijkste verschil is dat als je op de link op de pagina klikt om meer inhoud te laden, de browser geen nieuw verzoek aan de server zal doen. Je geeft items weer met de browser, dus deze gebruikt in plaats daarvan JavaScript om de nieuwe inhoud te laden en Vue.js zorgt ervoor dat alleen de nieuwe inhoud wordt weergegeven. Al het andere wordt met rust gelaten.

Dit is veel sneller omdat je slechts een heel klein deel van de pagina laadt om de nieuwe inhoud op te halen, in plaats van de hele pagina te laden.

Er zijn echter enkele compromissen met het gebruik van client-side rendering. Omdat de inhoud niet wordt weergegeven totdat de pagina in de browser is geladen, zal SEO voor de website een hit worden. Er zijn manieren om dit te omzeilen, maar het is niet zo eenvoudig als bij het renderen op de server.

Een ander ding om in gedachten te houden is dat uw website / applicatie niet kan laden totdat ALLE JavaScript naar de browser is gedownload. Logisch, want het bevat alle inhoud die nodig is. Als uw gebruikers een trage internetverbinding gebruiken, kan dit de aanvankelijke laadtijd een beetje lang maken.

#### Voor en nadelen van de verschillende aanpak

Voordelen voor de serverside:

- Zoekmachines kunnen de site crawlen voor betere SEO.
- De eerste pagina wordt sneller geladen.
- Geweldig voor statische sites

Nadelen aan serverside:

- Frequente serververzoeken.
- Een algehele trage paginaweergave.
- Herladen van volledige pagina.
- Niet-rijke site-interacties.

Voordelen voor clientside

- Rijke site-interacties
- Snelle website-rendering na de eerste keer laden.
- Ideaal voor webapplicaties.
- Robuuste selectie van JavaScript-bibliotheken.

Nadelen aan clientside:

- Lage SEO indien niet correct geïmplementeerd.
- De eerste keer laden kan meer tijd vergen.
- In de meeste gevallen is een externe bibliotheek vereist

Verschillen server en client side
cookies zijn server side en hebben een maximum opslag van 4kb
local storage is client side en heeft een maximum opslag van 5mb, daarnaast zal local storage langer online blijven.

Na het lezen van deze artikelen is voor mij helemaal duidelijk wat het precieze verschil is tussen serverside en clientside renderen. Dit zal mij veel helpen bij het vak Progressive Web Apps.

#### Interessante Bronnen

- [FreeCodeCamp](https://www.freecodecamp.org/news/what-exactly-is-client-side-rendering-and-hows-it-different-from-server-side-rendering-bd5c786b340d/)
- [Developers](https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering)
- [Medium](https://medium.com/@benjburkholder/javascript-seo-server-side-rendering-vs-client-side-rendering-bc06b8ca2383)
  </details>

## To Do

- [x] Heroku
- [x] .env file aanmaken
- [x] Manifest file (installable app)
- [x] Service worker

  - [x] Offline versie service worker
  - [ ] Offline state

- [ ] Optimaliseren

  - [x] Gulp concat
  - [ ] Minify
  - [x] Lazyloading (afbeeldingen)

- [ ] Rubric bijwerken
  - [ ] Verwijzing weekly nerd artikel, server / client side renderen
  - [ ] Lazyloading
  - [ ] Gulp concat
  - [ ] Service worker
  - [ ] Optimalisatie inc. mogelijkheden "wishlist"
  - [ ] Installaties bijwerken
  - [ ] Credits bijwerken
  - [ ] Bronnen bijwerken

## Artikelen

De artikelen die ik heb gelezen voor dit vak houd ik bij in mijn Github pages <br>
[Gitbook Artikelen](https://minor-web-dev.gitbook.io/progressive-web-apps/)

## Bronnen

- [Introduction to NPM Scripts](https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633/)
- [Get NPM](https://www.npmjs.com/get-npm)
- [Express Documentation](https://expressjs.com/en/api.html)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [ejs](https://ejs.co/#install)
- [Gulp](https://www.npmjs.com/package/gulp)
- [Gulp Concat](https://www.npmjs.com/package/gulp-concat)
- [Minify](https://www.npmjs.com/package/minify)
- [Chokidar](https://www.npmjs.com/package/chokidar)
- [PWA Web.dev](https://web.dev/codelab-make-installable/)
- [Service worker](https://developers.google.com/web/fundamentals/primers/service-workers)
- [Lazy Loader](https://imagekit.io/blog/lazy-loading-images-complete-guide/)

## Credits

- Robin Stut, hij heet mij geholpen met de Find() functie
- Ramon Meijer, hij heeft mij geholpen met het opstarten van Heroku
- Peppe Quint, hij heeft mij geholpen met het builden van mijn gulp
