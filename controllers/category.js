const { validationResult } = require('express-validator');

const Category = require('../models/category');

exports.addCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors = new Error('Signup failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const data = req.body;

    const { categoryName } = data;

    const category = new Category({
      categoryName: categoryName,
    });
    const result = await category.save();

    res
      .status(201)
      .json({ message: 'Category created successfully', category: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
