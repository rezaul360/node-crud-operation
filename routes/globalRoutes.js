const router = require("express").Router();
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const athenticate = require("../middleware/athentcate");
const adminAttendanceRoutes = require("./adminAttendanceRoutes");

// global router middleware
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", athenticate, userRouter);
router.use("/api/v1/admin/attendance", athenticate, adminAttendanceRoutes);

module.exports = router;
