const User = require("../models/authModel");
const error = require("../utils/error");

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

//update user
const updateUser = async (id, data) => {
  //check exists email not update
  const user = await findUserProperty("email", data.email);
  if (user) {
    throw error("Email already in use", 400);
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = { findUserProperty, createNewUser, findUsers, updateUser };
