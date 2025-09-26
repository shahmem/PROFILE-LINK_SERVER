const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String },
});

const UserSchema = new mongoose.Schema({
  username:{type: String, required: true},
  displayName: { type: String, required: true },
  bio: { type: String },
  links: [LinkSchema] ,
  // profileImage: { type: String },
});


module.exports = mongoose.model("User", UserSchema);
