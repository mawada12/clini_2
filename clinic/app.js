process.on("uncaughtException", (err) => {
  console.log(err);
});
const dotenv = require("dotenv");
const express = require("express");
const cors = require ('cors');
const path=require('path')
const app = express();


const filename = __filename;
var __dirname = path.dirname(filename)
dotenv.config({ path: path.join(__dirname, '.env') })

const morgan = require("morgan");

const AppError = require("./src/utils/AppError");
const {
  globalError,
  globalErrorDev
} = require("./src/utils/GlobalErrorHandler");

// env var


// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
  morgan("dev");
}
// routes
const userRouter = require("./src/modules/user/user.api");
const appointmentRouter = require("./src/modules/appointment/appointment.api");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(
    `can't find ${req.originalUrl} in method ${req.method}`,
    404
  );
  next(err);
});

// global error handler
if (process.env.NODE_ENV === "development") {
  app.use(globalErrorDev);
} else {
  app.use(globalError);
}
process.on("unhandledRejection", (err) => {
  console.log(err);
});
module.exports = app;
