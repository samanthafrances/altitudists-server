const dotenv = require('dotenv');
const express = require("express");
const connectMongo = require("./config/db.connection");

dotenv.config();
connectMongo();
const app = express();
const chatRouter = require("./routes/chatRouter");
const userRouter = require("./routes/userRouter");
const messageRouter = require('./routes/messageRouter');
const { notFound, errorHandler } = require("./middleware/error");
const morgan = require("morgan");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin:"http://localhost:4000",
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

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT 

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