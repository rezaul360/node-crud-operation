const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/authcontroller");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
