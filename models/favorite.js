const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
  name: String,
  description: String,
  location: String,
 
});


module.exports = mongoose.model("favorites", FavoritesSchema);