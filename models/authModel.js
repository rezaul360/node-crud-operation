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
    message: (prop) => `Invalid email ${prop.value}`,
  },
  password: {
    type: String,
    minlength: [6, "Password is too short"],
  },
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    required: true,
  },
});

//model
const AuthModel = model("Users", UserSchema);

module.exports = AuthModel;
