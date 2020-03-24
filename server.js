const express = require("express");
const app = express();
const port = normalizePort(process.env.PORT || "3000");
const paintingData = require("./modules/api");

// const overviewRouter = require("/routes/overview");
// const detailRouter = require("/routes/detail");
// const offlineRouter = require("/routes/offline");

app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", "views");

// Routes;
// app.use(overviewRouter);
// app.use(detailRouter);
// app.use(offlineRouter);

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
app.set("port", port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
