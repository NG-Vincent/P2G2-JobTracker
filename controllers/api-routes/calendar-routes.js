const router = require("express").Router();
const { User, Calendar } = require("../../models");

// Get all calendar events
router.get("/", (req, res) => {
  Calendar.findAll({
    // include: {
    //   model: User,
    //   attributes: ["id", "username"],
    // },
  })
    .then((dbCalendarData) => {
      res.status(200).json(dbCalendarData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Create calendar event
router.post("/", (req, res) => {
  console.log(req.body);
  Calendar.create({
    // user_id: req.session.user_id,
    title: req.body.title,
    start: req.body.start,
    description: req.body.description,
  })
    .then((dbCalendarData) => {
      res.status(201).json(dbCalendarData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Update calendar events
router.put("/:id", (req, res) => {
  Calendar.update(
    {
      title: req.body.title,
      start: req.body.start,
      description: req.body.description,
      status: req.body.status,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbCalendarData) => {
      res.status(200).json(dbCalendarData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
