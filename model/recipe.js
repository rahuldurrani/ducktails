const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    recipePicPath: String,
    description: {
        type: String
    },
    preptime: {
        type: Number,
        default: null
    },
    servings: {
        type: Number,
        default: null
    },
    ingredients: [{
        name: String
    }],
    steps: {
        type: Array,
        default: []
    },
    reviews: [{
        name: String,
        content: String,
        date: {
            type: Date,
            default: Date.now
        },
        profilePicPath: String
    }],
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        votes: Number,
        favs: Number
    },
    creator: {
        _id: String,
        name: String,
    },
    category: [{
        type: String,
        required: true
    }]
});

module.exports = {
    Recipe
};