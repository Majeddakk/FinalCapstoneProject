const { validationResult } = require('express-validator');

const Event = require('../models/event');
const User = require('../models/user');
const Category = require('../models/category');
const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodeMailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        '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',
    },
  })
);

exports.bookEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const data = req.body;
    const { tickets, numOfTickets } = data;
    const dataForUser = {
      tickets: tickets,
      numOfTickets: numOfTickets,
      event: eventId,
    };
    const user = await User.findById({ _id: req.session.user._id });
    await user.bookedEvents.push(dataForUser);
    await user.save();
    res.redirect('/homepage');
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getBusinessEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findById(eventId).then((event) => {
    res.render('btripdetails', {
      req,
      event: event,
      pageTitle: event.eventName,
      path: '/btrip',
    });
  });
};

exports.getVacationEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findById(eventId).then((event) => {
    res.render('vtripdetails', {
      req,
      event: event,
      pageTitle: event.eventName,
      path: '/vtrip',
    });
  });
};

exports.getOtherEvent = async (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findById(eventId).then((event) => {
    res.render('details', {
      req,
      event: event,
      pageTitle: event.eventName,
      path: '/tour',
    });
  });
};

exports.getOtherEvents = async (req, res, next) => {
  Event.find().then((events) => {
    res.render('tour', {
      req,
      events: events,
      pageTitle: 'Other Events',
      path: '/tour',
    });
  });
};

exports.btrip = async (req, res, next) => {
  const category = await Category.findOne({ categoryName: 'Business' });
  Event.find({ category: category._id }).then((events) => {
    res.render('btrip', {
      req,
      events: events,
      pageTitle: 'Business Events',
      path: '/btrip',
    });
  });
};

exports.vtrip = async (req, res, next) => {
  const category = await Category.findOne({ categoryName: 'Vacation' });
  Event.find({ category: category._id }).then((events) => {
    res.render('vtrip', {
      req,
      events: events,
      pageTitle: 'Vacation Events',
      path: '/vtrip',
    });
  });
};

exports.addEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errors = new Error('Signup failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const data = req.body;
    const {
      eventName,
      location,
      pricePerPerson,
      image,
      description,
      eventLength,
      eventDate,
      eventAgeRequired,
      category,
    } = data;

    const addedCategory = await Category.findOne({ categoryName: category });

    const event = await new Event({
      eventName: eventName,
      location: location,
      image: image,
      pricePerPerson: pricePerPerson,
      description: description,
      eventLength: eventLength,
      eventDate: eventDate,
      eventAgeRequired: eventAgeRequired,
      category: addedCategory._id,
      isApproved: false,
      creator: req.session.user._id,
    });
    await event.save();

    const eventCreator = await User.findOne({ _id: req.session.user._id });
    await eventCreator.createdEvents.push(event._id);
    await eventCreator.save();
    await transporter.sendMail({
      to: req.session.user.email,
      from: 'majeddakkour@live.com',
      subject: `event added succesfully:${event._id}`,
      html: '<h1>You have succesfully added an event</h1>',
    });
    res.redirect('/homepage');
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getAddEvent = async (req, res, next) => {
  res.render('addevent', { req });
};
