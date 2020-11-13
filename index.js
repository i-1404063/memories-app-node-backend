const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
require("./config/db")(mongoose);
app.use(cors({ origin: "http://localhost:3000" }));

//http logger
app.use(morgan("dev"));

//route
app.use("/api/posts", require("./routes/posts")); //route posts

//express routes error handler
app.use((req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
  next();
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`server is running on http://localhost:${port}`)
);
