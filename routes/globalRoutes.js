const router = require("express").Router();
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const athenticate = require("../middleware/athentcate");

// global router middleware
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", athenticate, userRouter);

module.exports = router;
