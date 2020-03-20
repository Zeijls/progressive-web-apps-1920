const express = require("express");
const app = express();
const port = 3000;
const paintingData = require("./modules/api");

app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", "views");

console.log("test");

app.get("/", (req, res) => {
  paintingData.getPaintings().then(function(paintingData) {
    res.render("overview", { data: paintingData });
  });
});

app.get("/paintings/:id", (req, res) => {
  const id = req.params.id;
  paintingData.getPaintings().then(function(paintingData) {
    function findPainting(painting) {
      return painting.objectNumber === id;
    }
    const newId = paintingData.artObjects.find(findPainting);
    res.render("detail", { paintingData: newId });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
