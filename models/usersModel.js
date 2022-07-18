const { Schema, model } = require("mongoose");

//schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
});

//model
const UserModels = model("Users", UserSchema);

module.exports = UserModels;
