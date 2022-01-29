const router = require("express").Router();
const {} = require("../models");

// show all posts
router.get("/", (req, res) => {
   res.send("Hello World!");
});

module.exports = router;
