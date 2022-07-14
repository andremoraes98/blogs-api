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

module.exports = {
  create,
};