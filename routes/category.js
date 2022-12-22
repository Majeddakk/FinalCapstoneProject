const express = require('express');
const router = express.Router();

const Category = require('../models/category');

const { body } = require('express-validator');

const categoryController = require('../controllers/category');

router.post(
  '/addcategory',
  [
    body('categoryName').custom((value, { req }) => {
      return Category.findOne({ categoryName: value }).then((category) => {
        if (category) {
          return Promise.reject({ message: 'Category already exists' });
        }
      });
    }),
  ],
  categoryController.addCategory
);

module.exports = router;
