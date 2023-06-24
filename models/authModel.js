const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  GithubId: String,
  DisplayName: String,
  Username: String,
  ProfileUrl: String,
  photos: String
});

const userModel = mongoose.model("userCredentials", userSchema);

module.exports = { userModel };