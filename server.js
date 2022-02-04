// config
require("dotenv").config();
// express server general
const express = require("express");
const path = require("path");
const routes = require("./controllers");
// database
const sequelize = require("./config/connection");
// handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
// session
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "p2g2's project is so amazing",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// ----------------------------------------------------------------
// run server
const app = express();
const PORT = process.env.PORT || 3001;

// general
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// session
app.use(session(sess));
app.use(routes);

// handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
