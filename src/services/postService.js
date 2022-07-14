const { BlogPost } = require('../database/models');

const create = async (blogPost) => {
  const post = await BlogPost.create(blogPost);

  return post;
};

module.exports = {
  create,
};