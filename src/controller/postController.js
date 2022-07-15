const PostService = require('../services/postService');

const create = async (req, res) => {
  try {
    const blogPost = req.body;
    const { authorization: token } = req.headers;

    const userId = await PostService.getUserIdWhereEmail(token);
  
    const result = await PostService.create({ ...blogPost, userId });
  
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getAll = async (_req, res) => {
  const result = await PostService.getAll();

  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const post = await PostService.getById(id);

  res.status(200).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;

  const post = await PostService.update(id);

  res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};