const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PinnedDestinationSchema = new Schema({
  name: String,
  address: String,
  lat: Number,
  long: Number,
  description: String,
  frequency: String
});

module.exports= mongoose.model("PinnedDestination", PinnedDestinationSchema);