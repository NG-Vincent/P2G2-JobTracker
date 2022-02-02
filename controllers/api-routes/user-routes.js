const router = require("express").Router();
const { User, Calendar } = require("../../models");

router.get("/", (req, res) => {
   User.findAll()
      .then((dbUserData) => {
         res.status(200).json(dbUserData);
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

router.post("/", (req, res) => {
   User.create({
      username: req.body.username,
      password: req.body.password,
   })
      .then((dbUserData) => {
         req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.password = dbUserData.password;
            req.session.loggedIn = true;

            res.status(201).json(dbUserData);
         });
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

// login
router.post("/login", (req, res) => {
   console.log(req.session.username);
   User.findOne({
      where: { username: req.body.username },
   })
      .then((dbUserData) => {
         console.log(req.session.username);
         console.log(dbUserData);

         if (!dbUserData) {
            res.status(404).json("No account");
            return;
         }

         // Verify user
         const validPassword = dbUserData.checkPassword(req.body.password);
         if (!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
         }

         req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are now logged in!" });
         });
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

module.exports = router;
