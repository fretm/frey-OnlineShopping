const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminroute = require("./route/admin");
const userroute = require("./route/user");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');

//load env vars
dotenv.config({ path: './config/config.env' });


app.use(compression());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
//app.use(cookieParser('my secret'));
app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    name: "freCookie"
  })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    next();
  });

app.use(helmet());

app.use(adminroute);
app.use(userroute);

mongoose
  .connect(process.env.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("server running");
    });
  });
