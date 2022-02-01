const router = require("express").Router();
const { User, Calendar } = require("../models");
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  res.render("calendar", { layout: "calendar" });
});

module.exports = router;
