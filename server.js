const dotenv = require('dotenv');
const express = require("express");
const connectMongo = require("./config/db.connection");

dotenv.config();
connectMongo();
const app = express();

const morgan = require("morgan");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const chatRouter = require("./routes/chatRouter");
const userRouter = require("./routes/userRouter");
const messageRouter = require('./routes/messageRouter');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin:"http://localhost:3000",
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/api/chat',(req,res) => {
  res.send(chats)
})


app.get("api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});


const PORT = process.env.PORT || 5000;

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

server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));