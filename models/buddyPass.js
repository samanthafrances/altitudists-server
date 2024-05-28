const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BuddyPassSchema = new Schema({
  name: String,
  email: String, 
  password: String,
  photo: String,
});

module.exports= mongoose.model("BuddyPass", BuddyPassSchema);