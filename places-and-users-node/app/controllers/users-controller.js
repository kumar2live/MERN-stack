const uuid = require('uuid/v4');
const { check, validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let testUsers = [
  {
    id: 'u1',
    name: 'Testing Name 1',
    email: 'test1@test.com',
    password: 'testers'
  },
  {
    id: 'u2',
    name: 'Testing Name 2',
    email: 'test2@test.com',
    password: 'testers'
  },
];

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid Details Provided, Please check', 422)
  }
  const {name, email, password} = req.body;

  const hasUser = testUsers.find(u => u.email === email);

  if (hasUser) {
    throw new HttpError('Could not sign up, Email already exists', 422);
  }

  const createUser = {
    id: uuid(),
    name,
    email,
    password,
  }
  testUsers.push(createUser);
  res.status(201).json({user: createUser});
};

const login = (req, res, next) => {
  const {email, password} = req.body;

  const identifiedUser = testUsers.find(u => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not find user, seems to be wrong', 401);
  }
  res.json({message: 'Logged In!'})
};

const getUsers = (req, res, next) => {
  res.json({users: testUsers});
};

exports.signup = signup;
exports.login = login;
exports.getUsers = getUsers;
