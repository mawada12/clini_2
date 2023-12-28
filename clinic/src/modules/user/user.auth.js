const User = require("./user.model");
const AppError = require("../../utils/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { SECRET_JWT, BEARER_KEY } = require("../../config/config");
const asyncHandler = require("express-async-handler");

exports.signUp = asyncHandler(async (req, res, next) => {
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) {
    return next(new AppError("user already exist!", 400));
  }
  const user = await User.create({ ...req.body });
  return res.status(201).json(user);
});

exports.signIn = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError("Invalid Credentials!", 401));
  }
  let token = jwt.sign(
    { name: user.name, userId: user.id, role: user.role },
    SECRET_JWT
  );
  return res.status(200).json({ token: process.env.BEARER_KEY + token });
});

exports.isUser = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return next(new AppError("Invalid authorization", 401));
  }
  token = token.replace(process.env.BEARER_KEY, "");
  const decoded = await jwt.verify(token, process.env.ECRET_JWT);
  let user = await User.findOne({ where: { id: decoded.userId } });
  if (!user) {
    return next(new AppError("Invalid authorization", 401));
  }
  return next();
});
