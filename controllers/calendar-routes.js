const router = require("express").Router();
const { User, Calendar } = require("../models");
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
