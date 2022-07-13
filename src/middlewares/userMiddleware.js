const Joi = require('joi');
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

const validateInfoEmailExists = async (req, res, next) => {
  const { email } = req.body;

  const emails = await UserService.getEmails();

  if (emails.includes(email)) {
    return res
      .status(409)
      .json({ message: 'User already registered' });
  }

  next();
};

module.exports = {
  validateBody,
  validateEmailExists,
  validateInfos,
  validateInfoEmailExists,
};