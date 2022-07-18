const User = require("../models/authModel");

//--------- get all users------------
const findUsers = () => {
  return User.find();
};

//------------database query---------------
const findUserProperty = (key, value) => {
  if (key == "_id") {
    User.findById(value);
  }
  return User.findOne({ [key]: value });
};

//-------- create user-------------------------
const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });

  return user.save();
};

module.exports = { findUserProperty, createNewUser, findUsers };
