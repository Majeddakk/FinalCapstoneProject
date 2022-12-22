const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventLength: {
        type: Number,
        required: true
    },
    pricePerPerson: {
        type: Number,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventAgeRequired: {
        type: Number,
        required: true
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    isApproved: {
        type: Boolean,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        required: true
    }
});


module.exports = mongoose.model('Event', eventSchema);