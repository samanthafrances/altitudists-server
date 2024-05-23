const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const passport = require('passport');

const AuthRouter = require("./routes/AuthRouter");
const buddyPassRouter = require("./routes/buddyPass");
const destinationRouter = require('./routes/destinationsRouter');
const PinnedDestinationsRouter = require('./routes/pinnedDestinationsRouter');
const buddyPassRouter = require('./routes/buddyPass');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", AuthRouter);
app.use("/buddyPass", buddyPassRouter);
app.use("/destination", destinationRouter);
app.use("/pinnedDestinations", PinnedDestinationsRouter);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));