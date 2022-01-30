const router = require("express").Router();

const homeRoutes = require("./home-routes.js");
const apiRoutes = require("./api-routes");
const calendarRoutes = require("./calendar-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/calendar", calendarRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
