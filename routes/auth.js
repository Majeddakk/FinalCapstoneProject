const express = require('express');

const { body } = require('express-validator');

const authController = require('../controllers/auth.js');
const isAuth = require('../middleware/isAuth');
const User = require('../models/user');

const router = express.Router();
router.get('/calendar', authController.calendar);

router.get('/homepage', authController.homepage);
router.get('/login', authController.getLogin);
router.get('/faq', authController.faq);


router.get('/tourguides', authController.tourguides);
router.get('/signup', authController.getSignup);
router.get('/about', authController.about);
router.get('/destinations', authController.destinations);
router.get('/addevent', authController.addevent);

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid Email')
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email already Taken');
          }
        });
      }),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
    body('phoneNumber').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post('/login',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid Email')
    .trim(),
  body('password').trim().isLength({ min: 5 }),
], authController.login);

router.post('/logout',authController.logout);

module.exports = router;
