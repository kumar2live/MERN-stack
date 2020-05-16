const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(
      new HttpError(
        "Could not create user because of password hashing, please try again!",
        500
      )
    );
  }

  const createUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createUser.save();
  } catch (error) {
    return next(new HttpError("Creating User Failed, Please try again", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createUser.id, email: createUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Creating User Failed, Please try again", 500));
  }

  res.status(201).json({
    userId: createUser.id,
    email: createUser.email,
    token: token,
    user: createUser.toObject({ getters: true }),
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Due to technical error Logging In failed", 500));
  }

  if (!identifiedUser) {
    return next(new HttpError("Could not find user, seems to be wrong", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (error) {
    return next(
      new HttpError(
        "Could not login because of password hashing, please try again!",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError(
        "Could not login because of password hashing, please try again!",
        500
      )
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Loggin User Failed, Please try again", 500));
  }

  res.status(200).json({
    message: "Logged In!",
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
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
