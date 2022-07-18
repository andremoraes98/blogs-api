const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
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

const getUserFromToken = async (token) => {
  const { data: { email } } = jwt.decode(token, process.env.JWT_SECRET);
  
  const result = await User.findOne({
    where: {
      email,
    },
    raw: true,
  });

  return result;
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: Category,
      as: 'categories',
      through: {
        attributes: [],
      },
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
      through: {
        attributes: [],
      },
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

const update = async (id, blogPost) => {
  const idPost = await BlogPost.update(blogPost, {
    where: {
      id,
    },
  });

  const result = await getById(idPost);

  return result;
};

const destroy = async (id) => {
  await BlogPost.destroy({
    where: {
      id,
    },
  });
  return null;
};

const getLike = async (search) => {
  const result = await BlogPost.findAll({
    where: {
      title: {
        [Op.like]: `%${search}%`,
      },
    },
    raw: true,
  });

  return result;
};

module.exports = {
  create,
  getUserFromToken,
  getAll,
  getById,
  getIds,
  update,
  destroy,
  getLike,
};