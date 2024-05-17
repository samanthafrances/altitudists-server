require("dotenv").config();
require('./config/db.connection.js')
require('./config/database');
require('./config/passport');

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/api/chat',(req,res) => {
  res.send(chats)
})

app.get("api/chat", (req, res) => {
  res.send(chats);
});

app.get("api/chat/:id", (req, res) => {
  console.log(req);
});

app.listen(5000, console.log("Server Started on Port 5000"));

const app = express();
const { PORT } = process.env;
const server = app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
const express = require("express");
const { chats } = require("./data.js")
const morgan = require("morgan");
const cors = require("cors");
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const userProfileRouter = require("./routes/UserProfile.js");
const AuthRouter = require("./routes/AuthRouter");
const destinationsRouter = require("./routes/destinations.js");
const chatRouter = require("./routes/chat.js");

const io = require('socket.io') (server, {
  pingTimeout: 60000,
  cors: {
    origin:"http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on( "setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);

});
});


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/auth", AuthRouter);
app.use("/destinations", destinationsRouter);
app.use("/chat", chatRouter);
app.use("/userProfile", userProfileRouter);



