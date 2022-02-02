const router = require("express").Router();
const { User } = require("../models");

// GET LOGIN PAGE
router.get("/", (req, res) => {
   res.render("login");
});

// GET KANBAN PAGE
router.get("/kanban", (req, res) => {
   res.render("kanban", { layout: "kanban", url: "/" });
});

// GET ACCOUNT-SETTINGS PAGE
router.get("/account", (req, res) => {
   User.findOne({
      attributes: {
         // don't show password
         exclude: ["password"],
      },
      where: {
         id: req.session.user_id,
      },
   })
      .then((dbUserData) => {
         if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
         }

         // serialize data before passing to template
         const userData = dbUserData.get({ plain: true });

         // pass data to template
         res.render("account", {
            userData,
            loggedIn: req.session.loggedIn,
         });
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// logout
router.get("/logout", (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   }
   res.redirect("/");
});

module.exports = router;
