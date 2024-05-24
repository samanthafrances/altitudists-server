const mongoose = require("mongoose");

const { DATABASE_URI } = process.env;

mongoose.connect(DATABASE_URI);

mongoose.connection
  .on("open", () =>
    console.log(`Connected by mongoose to database ${mongoose.connection.name}`)
  )
  .on("close", () =>
    console.log(`Disconnected from ${mongoose.connection.name}`)
  )
  .on("error", (error) => console.log(error));


   