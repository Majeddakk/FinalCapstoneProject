const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  bookedEvents: [
    {
      event: { type: Schema.Types.ObjectId, ref: 'Event' },
      tickets: { type: String },
      numOfTickets: { type: Number },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
