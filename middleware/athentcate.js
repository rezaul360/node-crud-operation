const jwt = require("jsonwebtoken");
const UserModel = require("../models/authModel");

async function athenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unathorized" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      res.status(401).json({ message: "Unathorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = athenticate;
