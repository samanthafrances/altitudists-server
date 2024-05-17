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

const userProfileRouter = require("./routes/UserProfile.js");
const AuthRouter = require("./routes/AuthRouter");
const destinationsRouter = require("./routes/destinations.js");
const chatRouter = require("./routes/chat.js");


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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use("/auth", AuthRouter);
app.use("/destinations", destinationsRouter);
app.use("/chat", chatRouter);
app.use("/userProfile", userProfileRouter);



app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));