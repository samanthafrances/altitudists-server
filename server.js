require("dotenv").config();
require('./config/db.connection.js')
require('./config/database');
require('./config/passport');

const app = express();
const { PORT } = process.env;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
    res.send("hello world");
});


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));