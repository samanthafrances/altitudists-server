const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
    name: String,
    address: String,
    website: String,
});
module.exports = mongoose.model("Destination", DestinationSchema)