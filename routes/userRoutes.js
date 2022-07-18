const router = require("express").Router();
const {
  getUsers,
  getUserById,
  postUser,
} = require("../controllers/usersController");

//get user by id or email
router.get("/:userId", getUserById);
//update user by id
router.put("/:userId", () => {});
//update user by id
router.patch("/:userId", () => {});
//delete user by id
router.delete("/:userId", () => {});

//get all user routes
router.get("/", getUsers);

//create new user
router.post("/", postUser);

module.exports = router;
