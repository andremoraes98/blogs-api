const { Post } = require('../database/models');

const create = async (blogPost) => {
  const post = await Post.create(blogPost);

  return post;
};

module.exports = {
  create,
};