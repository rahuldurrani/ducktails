const validator = require('validator');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
//const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: `{value} is not a valid email`
        }
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }],
    followees: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }],
    favRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }]
});

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);