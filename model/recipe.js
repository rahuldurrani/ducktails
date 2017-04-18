const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
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
        name: String,
        quantity: String
    }],
    steps: {
        type: Array,
        default: []
    },
    reviews: [{
        reviewer: mongoose.Schema.Types.ObjectId,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        votes: Number,
        favs: Number
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    _category: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }]
});

module.exports = {
    Recipe
};