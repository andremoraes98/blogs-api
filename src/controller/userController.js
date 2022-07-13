const UserService = require('../services/userService');

const getToken = async (req, res) => {
  const user = req.body;

  const token = UserService.generateToken(user);

  res.status(200).json({ token });
};

const create = async (req, res) => {
  const user = req.body;
  const token = UserService.generateToken(user);
  
  await UserService.create(user);

  res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await UserService.getAll();

  res.status(200).json(users);
};

module.exports = {
  getToken,
  create,
  getAll,
};