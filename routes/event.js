const express = require('express');
const { body } = require('express-validator');

//const isAuth = require('../middleware/isAuth');

const eventController = require('../controllers/event');

const router = express.Router();
router.get('/addevent', eventController.getAddEvent);

router.post('/addevent', eventController.addEvent);

router.get('/tour', eventController.getOtherEvents);

router.get('/btrip', eventController.btrip);

router.get('/vtrip', eventController.vtrip);

router.get('/tour/:eventId', eventController.getOtherEvent);

router.post('/tour/:eventId', eventController.bookEvent);

router.get('/btrip/:eventId', eventController.getBusinessEvent);

router.post('/btrip/:eventId', eventController.bookEvent);

router.get('/vtrip/:eventId', eventController.getVacationEvent);

router.post('/vtrip/:eventId', eventController.bookEvent);

router.get('/')

module.exports = router;
