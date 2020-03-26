const express = require("express");
const router = express.Router();

router.get("/offline", (req, res) => {
  res.render("offline");
});

module.exports = router;
