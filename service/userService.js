const User = require("../models/authModel");

//database query
const findUserProperty = (key, value) => {
  if (key == "_id") {
    User.findById(value);
  }
  return User.findOne({ [key]: value });
};

// create user
const createNewUser = ({ name, email, password }) => {
  const user = new User({ name, email, password });

  return user.save();
};

module.exports = { findUserProperty, createNewUser };
