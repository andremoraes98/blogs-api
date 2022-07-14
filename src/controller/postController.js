const PostService = require('../services/postService');

const create = async (req, res) => {
  try {
    const blogPost = req.body;
  
    const result = await PostService.create(blogPost);
  
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  create,
};