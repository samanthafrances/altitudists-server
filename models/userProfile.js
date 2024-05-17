const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema(
  {
  });

const userProfile = mongoose.model("UserProfile", userProfileSchema);
  
module.exports = userProfile;