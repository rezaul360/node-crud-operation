const router = require("express").Router();
const authRouter = require("./authRoutes");

// global router middleware
router.use("/api/v1/auth", authRouter);

module.exports = router;
