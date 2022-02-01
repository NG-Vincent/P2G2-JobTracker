const router = require("express").Router();
const {} = require("../models");

// GET LOGIN PAGE
router.get("/", (req, res) => {
  res.render("login");
});

// GET KANBAN PAGE
router.get("/kanban", (req, res) => {
  res.render("kanban", { layout: "kanban" });
});

// GET ACCOUNT-SETTINGS PAGE
router.get("/account", (req, res) => {
  res.render("account");
});

module.exports = router;
