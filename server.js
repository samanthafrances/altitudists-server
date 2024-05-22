const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dotenv = require('dotenv');
const connectMongo = require("./config/db.connection");
const morgan = require("morgan");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require("./middleware/error");

const chatRouter = require("./routes/chatRouter");
const userRouter = require("./routes/userRouter");
const messageRouter = require('./routes/messageRouter');

dotenv.config();
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/chat", chatRouter);

app.use(notFound);
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on('join chat', async (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);

    try {
      const chat = await Chat.findById(room);
      socket.emit("chat loaded", chat);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("create chat", async (newChat) => {
    try {
      const chat = await Chat.create(newChat);
      socket.emit("chat created", chat);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("update chat", async (updatedChat) => {
    try {
      const chat = await Chat.findByIdAndUpdate(updatedChat._id, updatedChat, { new: true });
      socket.emit("chat updated", chat);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("delete chat", async (chatId) => {
    try {
      await Chat.findByIdAndDelete(chatId);
      socket.emit("chat deleted", chatId);
    } catch (err) {
      console.error(err);
    }
  });


  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

const PORT = process.env.PORT || 5001;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});