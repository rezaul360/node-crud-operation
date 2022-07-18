require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
const router = require("./routes/globalRoutes");

//app
const app = express();

//status middleware
app.use(express.json());

//secrate data
const { PORT, MONGODB } = process.env;
//database connection
connectDB(MONGODB)
  .then(() => {
    console.log("MongoDB Connected");
    //server
    app.listen(PORT || 4000, () => {
      console.log("Application is running on port", PORT || 4000);
    });
  })
  .catch((e) => {
    console.log(e);
  });

//routes
app.use("/", router);
