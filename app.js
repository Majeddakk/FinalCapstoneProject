const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const mongodbstore = require('connect-mongodb-session')(session);

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const contactRoutes = require('./routes/contact');
const categoryRoutes = require('./routes/category');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const store = new mongodbstore({
  uri: 'mongodb+srv://majed:majed1@cluster0.ycgrqhn.mongodb.net/project1',
  collection: 'sessions',
});

app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(authRoutes);
app.use(eventRoutes);
app.use(contactRoutes);
app.use(categoryRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://majed:majed1@cluster0.ycgrqhn.mongodb.net/project1?retryWrites=true&w=majority'
  )
  .then((result) => {
    console.log('connected');
    app.listen(5000);
  })
  .catch((err) => console.log(err));
