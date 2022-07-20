const { addMinutes, isAfter } = require("date-fns");
const adminAttendance = require("../models/adminAttendance");
const error = require("../utils/error");

//admin attendance enable
const getEnable = async (req, res) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw error("Already running", 400);
    }
    const attendance = new adminAttendance({});
    await attendance.save();
    return res.status(200).json({ message: "Success", attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//admin attendance running
const getStatus = async (req, res) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running", 400);
    }
    const started = addMinutes(new Date(running.createdAt), running.timelimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//admin attendance disable
const getDisable = async (req, res) => {
  try {
    const running = await adminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running", 400);
    }
    running.status = "COMPLETED";
    await running.save();
    return res.status(200).json(running);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEnable, getDisable, getStatus };
