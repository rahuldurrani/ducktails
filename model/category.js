const mongoose = require('mongoose');

const category = mongoose.model('category', {
    name: String,
    backgroundPicPath: String,
    description: String
});

module.exports = {
    category
};