# Server Site Rendering

## Progressive Web Apps @cmda-minor-web 1819

<img width="1440" alt="overview" src="https://user-images.githubusercontent.com/45422060/76772179-beb23600-67a0-11ea-82f3-e15202dabe0f.png">)
<img width="1440" alt="detail" src="https://user-images.githubusercontent.com/45422060/76772236-d7bae700-67a0-11ea-9b8c-8f1381bbf08b.png">

## Inhoudspagina

- [Feedback](#Feedback)
- [Live Demo](#Live-Demo)
- [De opdracht](#De-opdracht)
- [Concept](#Concept)
- [Installatie](#Installatie)
- [API](#API)
- [Artikelen](#Artikelen)
- [Bronnenlijst](#Bronnenlijst)
- [Credits](#Credits)

## Feedback

- Mijn manifest bestand staat nu in de static map, hier wil ik mijn service worker ook aan toevoegen. Is dit een handige plek? Of kan dit ergens anders beter?
- Zodra de gebruiker offline geeft wil ik hier een melding van geven zoals veel applicaties ook doen (een balkje bovenin) is dit voldoende, of moet dit uitgebreider? <br>
  ![Voorbeeld Offline](/docs/img/vbOffline.png)

## Live Demo

[Live Demo](https://zeijls.github.io/performance-matters-1819/.)
Live demo werkt nog niet, moet dat nog deployen met Heroku.

## Opdracht

De web aplicatie moet server side worden gerenderd. Zodra de gebruiker offline is, moet de content zichbaar blijven. De concent die de gebruiker al een keer eerder heeft bezocht kan offline beschikbaar zijn doordat het wordt opgeslagen in de cache. Aan het einde van dit project is het de bedoeling dat het concept een progressive web app is.

## Concept

Op de webapplicatie zijn alle schilderijen van Rembrandt van Rijn in het Rijksmuseum weergegeven. Zodra een schilderij wordt geselecteerd worden de details weergegeven. Als het ophalen van de schilderijen lang duurt is er een loadingstate.

## Installatie

### Nodejs

Ik had nodejs al geinstalleerd op mijn computer. Om te controleren of NPM al is geintalleerd kun je het volgende commando toepassen in je terminal;

> node -v

Als je nodejs nog niet hebt kun je dit installeren via de volgende link;
[Nodejs installeren](https://nodejs.org/en/download/)

### NPM

Om te controleren of je NPM al hebt geinstalleerd kun je het volgende commando uitvoeren in je terminal;

> npm -v

Als je NPM nog moet installeren kun je het volgende commando uitvoeren in je terminal;

> npm install npm@latest -g

### Express

Om express te installeren heb je een aantal verschillende stappen nodig. Hierbij gaan we ervan uit dat je nodejs succesvol hebt geinstalleerd.

> mkdir myapp
> cd myapp

Gebruik npm init om een bestand package.json file aan te maken voor je applicatie.

> npm init

Om de standaard instellingen te accepteren zoals de versie en de naam van je applicatie kun je op enter klikken. In de entry point vul je de naam van je javascript bestand in.

> entry point: (index.js)

Installeer express in de dependecies list

> npm install express --save

### Nodemon

Nodemon kan de wijzigingen die je toepast in de applicatie meteen doorvoegen naar je localhost. Hierdoor hoef je niet iedere keer NPM af te sluiten en opnieuw op te starten. Nodemon installeer je op de volgende manier in je dependencies;

> npm install --save-dev nodemon

### ejs

Door middel van ejs kun je html renderen in je bestanden. Om ejc te installeren gebruik je het volgende commando;

> npm install ejs

### Gulp

> NPM install --save-dev gulp

Gulp uglify

> NPM install --save-dev gulp-uglify

Gulp concat

> NPM install --save-dev gulp-concat

Gulp CSS

> NPM install --save-dev gulp-css

### Chokidar

> NPM install --save-dev chokidar-cli

> "watch:css": "chokidar './static/css/\*.css' -c 'npm run build:css'"
> (in package.json)

## API

In deze applicatie gebruik ik de API van het Rijksmuseum. In deze API is een groot deel van de collectie van het Rijksmuseum verzameld. Alle details van de schilerderijen worden hierin weergegeven. Vanwege copyright restricties zijn kunstwerken van de 20e en 21e eeuw niet toegevoegd in deze API.

Om gebruik te maken van de API van het Rijksmuseum heb je een key nodig. Deze kun je aanvragen bij de gevanceerde account instellingen op de site van het Rijksumseum. https://www.rijksmuseum.nl/en/rijksstudio/

Ik heb alleen de schilderijen van Rembrandt van Rijn gebruikt door de volgende endpoints te gebruiken.

> const rijksAPI = baseURl + key + involvedMaker + maker;

Er bleven 9 schilderijen over. Vanaf dit punt heb ik deze schilderijen verder uitgezocht door middel van Map, Filter en Reduce.

## To Do

- [x] Heroku
- [x] .env file aanmaken
- [x] Manifest file (installable app)
- [x] Service worker

  - [ ] Offline versie service worker

- [x] Gulp concat
- [ ] Minify
- [ ] Afbeeldingen verkleinen

- [ ] Rubric doorlezen

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
