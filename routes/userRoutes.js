const router = require("express").Router();
const {
  getUsers,
  getUserById,
  postUser,
  deleteUseById,
  patchUseById,
  putUseById,
} = require("../controllers/usersController");

//get user by id or email
router.get("/:userId", getUserById);
//update user by id
router.put("/:userId", putUseById);
//update user by id
router.patch("/:userId", patchUseById);
//delete user by id
router.delete("/:userId", deleteUseById);

//get all user routes
router.get("/", getUsers);

//create new user
router.post("/", postUser);

module.exports = router;
