const express = require('express');

const router= express.Router();

const contactController=require('../controllers/contact');

router.get('/contact',contactController.getContactMessage);

router.post('/contact',contactController.sendContactMessage);






module.exports = router;
