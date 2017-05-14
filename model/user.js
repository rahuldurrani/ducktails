const validator = require('validator');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    local: {
        email: String,
        password: String,
    },
    profilePicPath: String,
    personalSummary: String,
    email: {
        type: String,
        trim: true,
        required: false,
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
        userid: String,
        firstName: String,
        profilePicPath: String,
        backgroundColor: String,
        personalSummary: String,
        required: false
    }],
    followees: [{
        userid: String,
        firstName: String,
        profilePicPath: String,
        backgroundColor: String,
        personalSummary: String,
        required: false
    }],
    favRecipes: [{
        type: String,
        required: false
    }]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', userSchema)

module.exports = {
    User
};