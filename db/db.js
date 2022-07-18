const mongoose = require("mongoose");

//database connection
function connectDB(conectStr) {
  return mongoose.connect(conectStr);
}

module.exports = connectDB;
