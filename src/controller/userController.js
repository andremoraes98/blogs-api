const UserService = require('../services/userService');
const PostService = require('../services/postService');

const getToken = async (req, res) => {
  const { email } = req.body;

  const token = UserService.generateToken(email);

  res.status(200).json({ token });
};

const create = async (req, res) => {
  const user = req.body;
  const token = UserService.generateToken(user);
  
  await UserService.create(user);

  res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const users = await UserService.getAll();

  res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await UserService.getById(id);

  res.status(200).json(user);
};

const destroy = async (req, res) => {
  const { authorization: token } = req.headers;

  const { email } = await PostService.getUserFromToken(token);

  await UserService.destroy(email);

  res.status(204).end();
};

module.exports = {
  getToken,
  create,
  getAll,
  getById,
  destroy,
};