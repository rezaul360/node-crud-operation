const { findUserProperty, createNewUser } = require("./userService");
const error = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register validation
const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  //email validation
  let user = await findUserProperty("email", email);
  if (user) {
    throw error("User already exists", 400);
  }

  //password hashing
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  //return create new user
  return createNewUser({ name, email, password, roles, accountStatus });
};
//-----------------------------------------------
// login validity
const loginService = async ({ email, password }) => {
  //email compire to database
  const user = await findUserProperty("email", email);
  if (!user) {
    throw error("Invalid Credential");
  }
  //compire hash password
  const isHashPass = await bcrypt.compare(password, user.password);
  if (!isHashPass) {
    throw error("Invalid Credential");
  }
  //json web token authentication
  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
  };
  //method
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
};

module.exports = { registerService, loginService };
