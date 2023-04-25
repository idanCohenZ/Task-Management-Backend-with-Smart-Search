require("dotenv").config();
require("./db/db_connection");
require("./models/tasksModel");

const express = require("express");
const { default: mongoose } = require("mongoose");
const tasksRouter = require("./routs/tasksRoute");

// const User = mongoose.model("testuser");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(tasksRouter);

app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
