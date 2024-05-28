require("dotenv").config();
require("./config/db.connection");
const express = require("express");
const path = require("path");
const { PORT } = process.env;
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const AuthRouter = require("./routes/AuthRouter");
const buddyPassRouter = require("./routes/buddyPass");
const destinationRouter = require('./routes/destinationsRouter');
const pinnedDestinationsRouter = require('./routes/pinnedDestinationsRouter');
const buddyPassRouter = require('./routes/buddyPass');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://altitudists-frontend-f7c210d67743.herokuapp.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

console.log('CORS middleware executed'); 

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/auth", AuthRouter);
app.use("/buddyPass", buddyPassRouter);
app.use("/destination", destinationRouter);
app.use("/pinnedDestinations", pinnedDestinationsRouter);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));