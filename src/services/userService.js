const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const getEmails = async () => {
  const emails = await User.findAll({
    attributes: ['email'],
    raw: true,
  });

  return emails.map((email) => email.email);
};

const generateToken = (user) => {
  const { email, password } = user;
  const payload = { data: { email, password } };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const create = async (user) => {
  const result = await User.create(user);

  return result;
};

const getEmailAndPassword = async () => {
  const infos = await User.findAll({
    attributes: ['email', 'password'],
  });

  return infos
    .map((info) => info.toJSON());
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    raw: true,
  });

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    raw: true,
  });

  return user;
};

module.exports = {
  getEmails,
  generateToken,
  create,
  getEmailAndPassword,
  getAll,
  getById,
};