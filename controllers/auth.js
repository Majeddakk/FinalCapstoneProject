const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { request } = require('express');

exports.homepage = async (req, res, next) => {
  res.render('index-2', { req });
};

exports.calendar = async (req, res, next) => {
  res.render('calendar', { req });
};
exports.faq = async (req, res, next) => {
  res.render('faq', { req });
};

exports.addevent = async (req, res, next) => {
  res.render('addevent', { req });
};

exports.getSignup = async (req, res, next) => {
  res.render('signup', { req });
};
exports.destinations = async (req, res, next) => {
  res.render('destinations', { req });
};

exports.about = async (req, res, next) => {
  res.render('about', { req });
};

exports.getLogin = async (req, res, next) => {
  res.render('login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.tourguides = async (req, res, next) => {
  res.render('tour-guides', { req });
};

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors = new Error('Signup failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
      phoneNumber: phoneNumber,
    });
    await user.save();
    res.redirect(303, '/login');
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    req.session.isLoggedIn = true;
    req.session.user = loadedUser;

    res
      .redirect(303, '/homepage')
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.logout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.redirect(303, '/login?time=${Date.now()}');
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
