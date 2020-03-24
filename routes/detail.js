const express = require("express");
const router = express.Router();
const paintingData = require("../modules/api");

router.get("/paintings/:id", (req, res) => {
  const id = req.params.id;
  paintingData.getPaintings().then(function(paintingData) {
    function findPainting(painting) {
      return painting.objectNumber === id;
    }
    const newId = paintingData.artObjects.find(findPainting);
    res.render("detail", { paintingData: newId });
  });
});

module.exports = router;
