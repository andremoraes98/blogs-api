const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const getEmails = async () => {
  const emails = await User.findAll({
    attributes: ['email'],
  });

  return emails
    .map((email) => email.toJSON())
    .map((email) => email.email);
};

const generateToken = (user) => {
  const { email, password } = user;
  const payload = { data: { email, password } };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = {
  getEmails,
  generateToken,
};