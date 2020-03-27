# Server Site Rendering

## Progressive Web Apps @cmda-minor-web 1819

<img width="1440" alt="overview" src="https://user-images.githubusercontent.com/45422060/76772179-beb23600-67a0-11ea-82f3-e15202dabe0f.png">)
<img width="1440" alt="detail" src="https://user-images.githubusercontent.com/45422060/76772236-d7bae700-67a0-11ea-9b8c-8f1381bbf08b.png">

## Inhoudspagina

- [Installatie](#Installatie)
- [Prototype](#Prototype)
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

## Prototype

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

[Server vs client side renderen](https://github.com/Zeijls/weekly-nerd-1920#Server-side-vs-Client-Side-renderen)

## Optimalisaties

### Service worker

Ik heb een server worker toegevoegd aan de applicatie. Alle pagina's die de gebruiker een keer heeft bezocht (en hier dus een request voor heeft gedaan) worden opgeslagen in de cache. De service worker controlleert of het bestand al in de cache staat en zal hem weergeven, en als dit niet het geval is fetcht hij het bestand en voegt het toe aan de cache. Hierdoor wordt de user experience bevorderd bij zwakke internetconnecties.

Screenshot audits

### Gulp concat

Ik heb gulp concat gebruikt om mijn verschillende css bestanden samen te voegen. Hierdoor hoeft er maar 1 bestand worden ingeladen in plaats van 4, en gaat dit een stuk sneller.

Screenshot audits

### Minifying

Ik heb gulp uglify toegepst om de statische css bestanden op te schonen. Alle overige spaties en tekens worden uit het bestand gefiltert waardoor het bestand een stuk kleiner is, en sneller kan downloaden.

Screenshot audits

### Gzipping

Ik heb gzipping gebruikt om de bestanden te verkleinen, zodat de bestanden kleiner en zijn en sneller worden gedownload.

<details><summary>Code</summary>
Install
> npm install compression

```js
const express = require("express");
const compression = require("compression");
const app = express();

app.use(compression());
```

</details>

### Lazy loading

In eerste instantie wilde ik mijn afbeeldingen verkleinen omdat deze enorm groot zijn. Omdat mijn afbeeldingen vanuit een API worden geladen kon ik deze niet makkelijk bewerken. Daarom heb ik lazy loading toegepast. De afbeeldingen die niet in de viewport van de gebruiker staan worden nog niet geladen. Op het moment dat de gebruiker gaat scrollen, of zijn scherm verkleint waardoor het mogelijk is dat de afbeeldingen in beeld komen, worden de afbeeldingen pas geladen. Hier werd de website een heel stuk sneller van.

## Conclusie

Doordat de applicatie van dit project niet zo groot is, zag ik wel bevorderingen in mijn optimalisaties, maar de verschillen waren niet enorm. De grootste verschillen in tijd kwamen aan bod bij de service worker, en de lazy loading. Vooral op het moment dat een gebruiker een pagina voor de tweede keer bezoekt zat hier een groot verschil in tijd in. Daarnaast is het wel goed om je hier een keer goed in te verdiepen zodat je weet hoe dit in zijn werking gaat voor grotere applicaties.

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

- Robin Stut, hij heeft mij geholpen met de Find() functie
- Ramon Meijer, hij heeft mij geholpen met het deployen op Heroku
- Peppe Quint, hij heeft mij geholpen met het builden van mijn gulp in de packages
