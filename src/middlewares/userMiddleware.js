require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const validateBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateEmailExists = async (req, res, next) => {
  const { email } = req.body;

  const emails = await UserService.getEmails();

  if (!emails.includes(email)) {
    return res
      .status(400)
      .json({ message: 'Invalid fields' });
  }

  next();
};

const validateInfos = async (req, res, next) => {
  try {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });
  
    await schema.validateAsync(req.body);

    next();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const validateInfoEmailExist = async (req, res, next) => {
  const { email } = req.body;

  const emails = await UserService.getEmails();

  if (emails.includes(email)) {
    return res
      .status(409)
      .json({ message: 'User already registered' });
  }

  next();
};

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const { data: credentials } = jwt
    .decode(token, process.env.JWT_SECRET) || { data: { email: '', password: '' } };
  const users = await UserService.getEmailAndPassword();
  const isCredentialsValid = users
    .some((user) => user.email === credentials.email && user.password === credentials.password);

  if (!isCredentialsValid) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

const validateIdExists = async (req, res, next) => {
  const { id } = req.params;

  const ids = await UserService.getId();

  if (!ids.includes(Number(id))) {
    return res
      .status(404)
      .json({ message: 'User does not exist' });
  }

  next();
};

module.exports = {
  validateBody,
  validateEmailExists,
  validateInfos,
  validateInfoEmailExist,
  validateToken,
  validateIdExists,
};