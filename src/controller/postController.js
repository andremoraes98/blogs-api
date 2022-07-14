const PostService = require('../services/postService');

const create = async (req, res) => {
  const blogPost = req.body;

  const result = await PostService.create(blogPost);

  res.status(201).json(result);
};

module.exports = {
  create,
};