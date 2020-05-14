const { validationResult } = require("express-validator");
const User = require("../mongo/models/user");

const HttpError = require("../models/http-error");

const signup = async (req, res, next) => {
  // console.log('req.body -- ', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Details Provided, Please check", 422));
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Due to technical error", 500));
  }

  if (existingUser) {
    return next(new HttpError("Could not sign up, Email already exists", 422));
  }

  const createUser = new User({
    name,
    email,
    image: req.file.path,
    password,
    places: [],
  });

  try {
    await createUser.save();
  } catch (error) {
    return next(new HttpError("Creating User Failed, Please try again", 500));
  }
  res.status(201).json({ user: createUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Due to technical error Logging In failed", 500));
  }

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Could not find user, seems to be wrong", 401));
  }
  res.status(200).json({
    message: "Logged In!",
    user: identifiedUser.toObject({ getters: true }),
  });
};

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError("Could not find users due to tech error", 404));
  }

  if (!users || users.length === 0) {
    return next(new HttpError("Could not any users!", 404));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.signup = signup;
exports.login = login;
exports.getUsers = getUsers;
