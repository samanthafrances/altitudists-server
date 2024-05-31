const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BuddyPassSchema = new Schema({
  name: String,
  email: String,
  destination: {
    type: mongoose.Types.ObjectId,
    ref: "Destination"
  },
});

module.exports = mongoose.model("BuddyPass", BuddyPassSchema);
