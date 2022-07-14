const jwt = require('jsonwebtoken');
const { BlogPost, User } = require('../database/models');

const create = async (blogPost) => {
  const post = await BlogPost.create(blogPost);

  return post;
};

const getUserIdWhereEmail = async (token) => {
  const { data: { email } } = jwt.decode(token, process.env.JWT_SECRET);
  
  const result = await User.findOne({
    where: {
      email,
    },
    attributes: ['id'],
    raw: true,
  });

  return result.id;
};

module.exports = {
  create,
  getUserIdWhereEmail,
};