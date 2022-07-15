const jwt = require('jsonwebtoken');
const { BlogPost, User, PostCategory, Category } = require('../database/models');

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
  const result = await BlogPost.findAll({
    include: [{
      model: Category,
      as: 'categories',
    },
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
  });

  return result;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    include: [{
      model: Category,
      as: 'categories',
    },
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
    where: {
      id,
    },
  });

  return post;
};

const getIds = async () => {
  const ids = await BlogPost.findAll({
    attributes: ['id'],
    raw: true,
  });

  return ids.map((id) => id.id);
};

module.exports = {
  create,
  getUserIdWhereEmail,
  getAll,
  getById,
  getIds,
};