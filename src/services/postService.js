const jwt = require('jsonwebtoken');
const { BlogPost, User, PostCategory } = require('../database/models');

const create = async (blogPost) => {
  const { dataValues: post } = await BlogPost.create(blogPost);

  const postCategories = blogPost.categoryIds.map((categoryId) => ({
    postId: post.id,
    categoryId,
  }));

  await PostCategory.bulkCreate(postCategories);

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

const getAll = async () => {
  const result = BlogPost.findAll();

  return result;
};

module.exports = {
  create,
  getUserIdWhereEmail,
  getAll,
};