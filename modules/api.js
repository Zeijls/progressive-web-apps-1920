async function getPaintings() {
  const baseURl = "https://www.rijksmuseum.nl/api/nl/collection?key=";
  const key = "uc0ncT1V";
  const involvedMaker = "&involvedMaker=";
  const maker = "Rembrandt+van+Rijn";
  const fetch = require("node-fetch");

  const rijksAPI = baseURl + key + involvedMaker + maker;

  const data = await fetch(rijksAPI)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });

  return data;
}

module.exports = { getPaintings };
