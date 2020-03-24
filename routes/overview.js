const express = require("express");
const router = express.Router();
const paintingData = require("../modules/api");

router.get("/", (req, res) => {
  paintingData.getPaintings().then(function(paintingData) {
    res.render("overview", { data: paintingData });
  });
});

module.exports = router;
