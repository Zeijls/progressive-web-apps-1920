require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

const overviewRouter = require("./routes/overview");
const detailRouter = require("./routes/detail");
// const offlineRouter = require("./routes/offline");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "static")));
// Routes;
app.use("/", overviewRouter);
app.use(detailRouter);
// app.use(offlineRouter);

// app.listen(function(port) {
//   console.log("server is running" + port);
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

// app.get("/", (req, res) => {
//   paintingData.getPaintings().then(function(paintingData) {
//     res.render("overview", { data: paintingData });
//   });
// });

// app.get("/paintings/:id", (req, res) => {
//   const id = req.params.id;
//   paintingData.getPaintings().then(function(paintingData) {
//     function findPainting(painting) {
//       return painting.objectNumber === id;
//     }
//     const newId = paintingData.artObjects.find(findPainting);
//     res.render("detail", { paintingData: newId });
//   });
// });

// module.exports = app;
