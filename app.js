import cors from "cors";
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//!Connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/mern-expenses")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//! Cors config
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://amazing-figolla-925471.netlify.app"
  ],
  credentials: true
}));

// app.use(express.json());

//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/Users", userRouter);
app.use("/Category", categoryRouter);
app.use("Tranaction", transactionRouter);
//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});