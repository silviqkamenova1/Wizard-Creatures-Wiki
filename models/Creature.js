const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const publicSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name must be at least 2 characters'],
        required: [true, 'Name is required'],
    },
    species: {
        type: String,
        minLength: [3, 'Species must be at least 3 characters'],
        required: [true, 'Species is required'],
    },
    skinColor  : {
        type: String,
        minLength: [3, 'SkinColor must be no more than 3 characters'],
        required: [true, 'SkinColor  is required'],
    },
    eyeColor : {
        type: String,
        minLength: [3, 'Eye color must be 13 characters'],
        // maxLength: [10, 'Date must be no more than 10 characters'],
        required: [true, 'EyeColor  is required'],
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
        minLength: [5, 'Description must be at least 5 characters'],
        maxLength: [500, 'Description must be no more than 500 characters'],
        required: [true, 'Description is required'],
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: [],
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },


},
    {
        strict: false,
    });


const Publication = mongoose.model('Publication', publicSchema);

module.exports = Publication;