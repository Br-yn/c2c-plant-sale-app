const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: 6
    },
    price: {
        type: Number,
        trim: true,
    },
    description: {
        type: String,
        minlength: 10
    },
    images: [Buffer],
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;