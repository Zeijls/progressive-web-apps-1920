# Progressive Web App Rembrandt van Rijn

## Server side renderen | Progressive Web Apps @cmda-minor-web 1819

<img width="1440" alt="Screenshot 2020-03-27 at 12 49 25" src="https://user-images.githubusercontent.com/45422060/77753238-69401980-7029-11ea-86ee-c8bfc63f5200.png">
<img width="1440" alt="Screenshot 2020-03-27 at 12 48 57" src="https://user-images.githubusercontent.com/45422060/77753244-6ba27380-7029-11ea-9eb0-52a148ec6c6d.png">

## Inhoud

- [Installatie](#Installatie)
- [Prototype](#Prototype)
- [De opdracht](#De-opdracht)
- [Concept](#Concept)
- [API](#API)
- [Server side renderen](#Server-side-renderen)
- [Optimalisaties](#Optimalisaties)
  - [Caching](#Caching)
  - [Gulp Concat](#Gulp-Concat)
  - [Minifying](#Minifying)
  - [Gzipping](#Gzipping)
  - [Lazy Loading](#Lazy-Loading)
- [Conclusie](#Conclusie)
- [Audits](#Audits)
- [To Do](#To-Do)
- [Artikelen](#Artikelen)
- [Bronnen](#Bronnen)
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

Op de webapplicatie zijn alle schilderijen van Rembrandt van Rijn in het Rijksmuseum weergegeven. Zodra een schilderij wordt geselecteerd worden de details weergegeven.

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

### Caching

Ik heb caching toegevoegd dmv. een service worker

#### Service worker

Ik heb een server worker toegevoegd aan de applicatie. Alle pagina's die de gebruiker een keer heeft bezocht (en hier dus een request voor heeft gedaan) worden opgeslagen in de cache. De service worker controlleert of het bestand al in de cache staat en zal hem weergeven, en als dit niet het geval is fetcht hij het bestand en voegt het toe aan de cache. Hierdoor wordt de user experience bevorderd bij zwakke tot geen internetconnecties. Zodra de bestanden in de cache staan zijn ze gedownload, en kunnen ze offline worden bekeken.

<details><summary>Code</summary>

```js
var CACHE_NAME = "v1";
var urlsToCache = ["/", "/css/main.css"];

// Install service worker
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// check and clone the response, one for the browser and one for the cache
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
```

`code in footer`:

```js
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function (registration) {
                    return registration.update();
                })
        });
    }
</script>
```

</details>

<details><summary>Audits</summary>
<img width="686" alt="Screenshot 2020-03-27 at 17 00 35" src="https://user-images.githubusercontent.com/45422060/77775260-9e119800-704c-11ea-921f-364f111005cd.png">

</details>

<details><summary>Aplication</summary>
Standaard worden de overzichtspagina en main.css gecacht. 
<img width="734" alt="Screenshot 2020-03-27 at 12 08 51" src="https://user-images.githubusercontent.com/45422060/77750245-bcaf6900-7023-11ea-8613-f06ccd5af588.png">

Zodra de gebruiker een detailpagina heeft bezocht. Wordt deze ook opgeslagen in de cache.
<img width="733" alt="Screenshot 2020-03-27 at 12 10 49" src="https://user-images.githubusercontent.com/45422060/77750410-039d5e80-7024-11ea-97bd-11a04abf2655.png">

</details>

### Gulp concat

Ik heb gulp concat gebruikt om mijn verschillende css bestanden samen te voegen. Hierdoor hoeft er maar 1 bestand worden ingeladen in plaats van 4, en gaat dit een stuk sneller.

<details><summary>Code</summary>

`build-css.js`:

```js
const gulp = require("gulp");
const concat = require("gulp-concat");

return gulp
  .src("./static/css/*.css")
  .pipe(concat("main.css"))
  .pipe(gulp.dest("./static/css/"));
```

`package.json`:

```js
"prebuild": "rimraf ./static/css/main.css",
    "build": "npm-run-all build:*",
    "build:css": "node ./scripts/build-css.js",
```

</details>

<details><summary>Audits</summary>
<img width="686" alt="Screenshot 2020-03-27 at 17 00 35" src="https://user-images.githubusercontent.com/45422060/77775260-9e119800-704c-11ea-921f-364f111005cd.png">
</details>

<details><summary>Netwerk</summary>
<img width="920" alt="Screenshot 2020-03-26 at 14 20 08" src="https://user-images.githubusercontent.com/45422060/77749232-f3847f80-7021-11ea-944e-d2a1eadb3d6a.png">

</details>

### Minifying

Ik heb gulp uglify toegepst om de statische css bestanden op te schonen. Alle overige spaties en tekens worden uit het bestand gefiltert waardoor het bestand een stuk kleiner is, en sneller kan downloaden.

<details><summary>Code</summary>

`commando`:

```js
npm run cleancss
```

`ontvangen code in main.min.css bestand`:

```js
header>ul>li>a{color:#fff;font-size:80px;text-transform:uppercase;text-decoration:none;margin-left:20%}header>ul{list-style:none}body>main>section{padding:1rem;color:#000;display:block;width:60%;height:1500px;margin-left:auto;margin-right:auto;background-color:#d55340}body>main>section>h2{font-size:200px;text-align:left;margin-left:50px}body>main>section.active{opacity:1}#rijksContainer{display:grid;grid-template-columns:repeat(3,1fr);grid-column-gap:50px;grid-template-rows:repeat(3,1fr);grid-row-gap:50px;list-style:none;width:80%;margin-left:auto;margin-right:auto}#rijksContainer li img{object-fit:cover;width:100%;min-height:500px;background-color:#d55340}section[data-route=painting]{width:80%;height:500px;display:flex;flex-direction:row;padding:0;margin-top:50px}section[data-route=painting] img{width:70%;height:100%;object-fit:cover}section[data-route=painting] section{color:#fff;font-size:1.5em}section[data-route=painting] section:nth-of-type(1){font-size:1.5em;margin:30px 20px 30px 20px;font-family:Arial,Helvetica,sans-serif;font-weight:700}section[data-route=painting] section:nth-of-type(2){font-size:1.2em;margin:0 0 0 20px;font-family:Arial,Helvetica,sans-serif}section[data-route=painting] section:nth-of-type(3){font-size:1.2em;margin:0 0 0 20px;font-family:Arial,Helvetica,sans-serif;font-weight:200;text-transform:capitalize}section[data-route=painting] a{margin:0 0 0 20px;font-size:1em;text-decoration:none;text-transform:uppercase;position:absolute;bottom:100px;color:#fff}img.lazy{background-color:#d55340;width:400px;height:300px;display:block;margin:10px auto;border:0}.loader{display:flex;flex-direction:column;justify-content:center;align-items:center}.loader img{height:100px;width:100px;margin-top:100px}body,html{height:100%;font-family:Roboto,sans-serif;background-color:#000}h1{font-size:3vw;text-align:center;margin-bottom:0;color:#fff}h2{font-size:1.5em;margin-top:0;text-align:center;color:#fff}
```

</details>

<details><summary>Audits</summary>
<img width="686" alt="Screenshot 2020-03-27 at 17 00 35" src="https://user-images.githubusercontent.com/45422060/77775260-9e119800-704c-11ea-921f-364f111005cd.png">
</details>

<details><summary>Netwerk</summary>
<img width="920" alt="Screenshot 2020-03-26 at 14 20 08" src="https://user-images.githubusercontent.com/45422060/77749232-f3847f80-7021-11ea-944e-d2a1eadb3d6a.png">

</details>

### Gzipping

Ik heb gzipping gebruikt om de bestanden te verkleinen, zodat de bestanden kleiner en zijn en sneller worden gedownload.

<details><summary>Code</summary>

```js
const express = require("express");
const compression = require("compression");
const app = express();

app.use(compression());
```

</details>

<details><summary>Audits</summary>
<img width="686" alt="Screenshot 2020-03-27 at 17 00 35" src="https://user-images.githubusercontent.com/45422060/77775260-9e119800-704c-11ea-921f-364f111005cd.png">

</details>

<details><summary>Netwerk</summary>
<img width="958" alt="Screenshot 2020-03-27 at 11 51 52" src="https://user-images.githubusercontent.com/45422060/77748965-853fbd00-7021-11ea-98c5-fb6811df74a3.png">

</details>

### Lazy loading

In eerste instantie wilde ik mijn afbeeldingen verkleinen omdat deze enorm groot zijn. Omdat mijn afbeeldingen vanuit een API worden geladen kon ik deze niet makkelijk bewerken. Daarom heb ik lazy loading toegepast. De afbeeldingen die niet in de viewport van de gebruiker staan worden nog niet geladen. Op het moment dat de gebruiker gaat scrollen, of zijn scherm verkleint waardoor het mogelijk is dat de afbeeldingen in beeld komen, worden de afbeeldingen pas geladen. Hier werd de website een heel stuk sneller van.

<details><summary>Code</summary>

```js
// Voegt de class "dat-src" toe aan de img en verwijderd de "src"
const allImages = document.querySelectorAll("img");
allImages.forEach(img => {
  img.setAttribute("data-src", img.src);
  img.removeAttribute("src");
});

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");
  var lazyloadThrottleTimeout;

  // Verwijder timeout
  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    // Zet een timeout op de images die nog niet in beeld zijn
    lazyloadThrottleTimeout = setTimeout(function() {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function(img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  // Eventlisteners wanneer het laden van de images moet starten.
  document.addEventListener("scroll", lazyload);
  window.addEventListener("load", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});
```

</details>

<details><summary>Audits</summary>
<img width="686" alt="Screenshot 2020-03-27 at 17 00 35" src="https://user-images.githubusercontent.com/45422060/77775260-9e119800-704c-11ea-921f-364f111005cd.png">

</details>

<details><summary>Netwerk</summary>
<img width="958" alt="Screenshot 2020-03-27 at 11 51 52" src="https://user-images.githubusercontent.com/45422060/77748965-853fbd00-7021-11ea-98c5-fb6811df74a3.png">

</details>

### Afbeeldings grootte verkleinen

Doordat de afbeeldingen uit een API komen, is het erg lastig om iets met de bestandsgrootte te doen. Zodra ik de afbeeldingen aanroep met item.headerImage.url gaat de laadtijd op slow3G van 11min naar 5,64s. De afbeeldingen zijn ingezoomed, dit heb ik voor nu zo gelaten door tijdnood. Maar is zeker een punt voor de toekomst om verder naar te kijken.

`webImage.url`:
<img width="1273" alt="Screenshot 2020-03-27 at 17 09 26" src="https://user-images.githubusercontent.com/45422060/77776100-c948b700-704d-11ea-95ff-f5ed118ad7d1.png">

`headerImage.url`:
<img width="1274" alt="Screenshot 2020-03-27 at 17 09 32" src="https://user-images.githubusercontent.com/45422060/77776154-debde100-704d-11ea-9eb4-504af6278f87.png">

## Conclusie

Doordat de applicatie van dit project niet zo groot is, zag ik wel bevorderingen in mijn optimalisaties, maar de verschillen waren niet enorm. De grootste verschillen in tijd kwamen aan bod bij de service worker, en de lazy loading. Vooral op het moment dat een gebruiker een pagina voor de tweede keer bezoekt zat hier een groot verschil in tijd in. Daarnaast is het wel goed om je hier een keer goed in te verdiepen zodat je weet hoe dit in zijn werking gaat voor grotere applicaties.

## Audits

<details><summary>Performance</summary>
<img width="686" alt="Screenshot 2020-03-27 at 17 00 35" src="https://user-images.githubusercontent.com/45422060/77775260-9e119800-704c-11ea-921f-364f111005cd.png">
</details>

<details><summary>Accecibility</summary>
<img width="688" alt="Screenshot 2020-03-27 at 17 00 41" src="https://user-images.githubusercontent.com/45422060/77775412-cc8f7300-704c-11ea-9966-562d7d494998.png">

</details>

<details><summary>Best Practices</summary>
<img width="688" alt="Screenshot 2020-03-27 at 17 00 48" src="https://user-images.githubusercontent.com/45422060/77775456-d87b3500-704c-11ea-997e-8c40f42922a9.png">
</details>

<details><summary>SEO</summary>
<img width="687" alt="Screenshot 2020-03-27 at 17 00 52" src="https://user-images.githubusercontent.com/45422060/77775485-e29d3380-704c-11ea-9957-d54822ab7401.png">
</details>

<details><summary>Progressive Web Apps</summary>
<img width="688" alt="Screenshot 2020-03-27 at 17 01 02" src="https://user-images.githubusercontent.com/45422060/77775509-ecbf3200-704c-11ea-89d3-2c17f418f157.png">
</details>

## To Do

- [x] Heroku
- [x] .env file aanmaken
- [x] Manifest file (installable app)
- [x] Service worker

  - [x] Offline bestanden in service worker
  - [ ] Offline state weergeven

- [x] Optimaliseren

  - [x] Gulp concat
  - [x] Minify
  - [x] Lazyloading (afbeeldingen)
  - [x] Compression

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
