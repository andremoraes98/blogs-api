const { Category } = require('../database/models');

const create = async (name) => {
  const category = await Category.create(name);

  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getIds = async () => {
  const result = await Category.findAll({
    attributes: ['id'],
    raw: true,
  });

  return result.map((id) => id.id);
};

module.exports = {
  create,
  getAll,
  getIds,
};