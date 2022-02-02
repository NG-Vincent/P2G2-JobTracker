const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get all users
router.get("/", (req, res) => {
   User.findAll({
      attributes: {
         // don't show passwords
         exclude: ["password"],
      },
   })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// get specific user
router.get("/:id", (req, res) => {
   User.findOne({
      attributes: {
         // don't show password
         exclude: ["password"],
      },
      where: {
         id: req.params.id,
      },
      include: [
         // get all of the user's posts
         {
            model: Post,
            attributes: ["id", "title", "content", "created_at"],
         },
         // get all of the user's comments
         {
            model: Comment,
            attributes: ["id", "comment_text", "created_at"],
            include: {
               model: Post,
               attributes: ["title"],
            },
         },
      ],
   })
      .then((dbUserData) => {
         if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
         }
         res.json(dbUserData);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// create new user
router.post("/", (req, res) => {
   User.create({
      username: req.body.username,
      password: req.body.password,
   })
      .then((dbUserData) => {
         req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
         });
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// login
router.post("/login", (req, res) => {
   User.findOne({
      where: {
         username: req.body.username,
      },
   }).then((dbUserData) => {
      if (!dbUserData) {
         res.status(400).json({ message: "No user with that name!" });
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
   });
});

// logout
router.post("/logout", (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
});

module.exports = router;
