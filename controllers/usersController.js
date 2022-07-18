const userService = require("../service/userService");
const authService = require("../service/authService");
const error = require("../utils/error");

//--------get all users controller-------
const getUsers = async (req, res) => {
  try {
    const users = await userService.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//------get  user by id controller-------
const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userService.findUserProperty("_id", userId);

    if (!user) {
      throw error("User not found", 404);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postUser = async (req, res) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const putUseById = (req, res) => {};
const patchUseById = (req, res) => {};
const deleteUseById = (req, res) => {};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUseById,
  patchUseById,
  deleteUseById,
};
