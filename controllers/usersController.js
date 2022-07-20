const userService = require("../service/userService");
const authService = require("../service/authService");
const error = require("../utils/error");

//--------get all users controller-------
const getUsers = async (req, res) => {
  try {
    //call user service
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
    //call user service
    const user = await userService.findUserProperty("_id", userId);

    if (!user) {
      throw error("User not found", 404);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------post  user by admin controller-------
const postUser = async (req, res) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    //call auth user service
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
//------put update  user  controller-------
const putUseById = async (req, res) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;

  try {
    //call user service updateUser
    const user = await userService.updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });
    //conditions check
    if (!user) {
      throw error("User not found", 404);
    }
    //success
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------patch update  user  controller-------
const patchUseById = async (req, res) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;
  try {
    if (email) {
      throw error("Can't edit email!", 400);
    }
    //call auth user service
    const user = await userService.findUserProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    //condition check
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------delete  user id controller-------
const deleteUseById = async (req, res) => {
  const userId = req.params.userId;

  try {
    //call  user service
    const user = await userService.findUserProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    user.remove();
    return res.status(203).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUseById,
  patchUseById,
  deleteUseById,
};
