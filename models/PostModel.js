const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const publicSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [6, 'Title must be at least 6 characters'],
        required: [true, 'Title is required'],
    },
    keyword: {
        type: String,
        minLength: [6, 'Keyword must be at least 6 characters'],
        required: [true, 'Keyword is required'],
    },
    location: {
        type: String,
        maxLength: [15, 'Title must be no more than 15 characters'],
        required: [true, 'Location is required'],
    },
    date: {
        type: String,
        minLength: [10, 'Date must be 10 characters'],
        maxLength: [10, 'Date must be no more than 10 characters'],
        required: [true, 'Date is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            }, message: 'Image must be valid URL'
        }
    },
    description: {
        type: String,
        minLength: [10, 'Keyword must be at least 10 characters'],
        required: [true, 'Description is required'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    votesOnPost: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    ratingOfPost: {
        type: Number,
        default: 0,
    }

},
    {
        strict: false,
    });


const Publication = mongoose.model('Publication', publicSchema);

module.exports = Publication;