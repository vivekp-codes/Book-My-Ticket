const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected ");
  })
  .catch((err) => {
    console.log("Database Error:", err);
  });

module.exports = mongoose;