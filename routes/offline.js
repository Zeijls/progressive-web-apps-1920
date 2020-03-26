const express = require("express");
const router = express.Router();

router.get("/offline", function(req, res, next) {
  res.render("offline");
});

module.exports = router;
