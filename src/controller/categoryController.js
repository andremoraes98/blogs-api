const CategoryService = require('../services/categoryService');

const create = async (req, res) => {
  const name = req.body;

  const category = await CategoryService.create(name);

  res.status(201).json(category);
};

const getAll = async (_req, res) => {
  const categories = await CategoryService.getAll();

  res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};