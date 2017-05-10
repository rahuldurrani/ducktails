const mongoose = require('mongoose');

const category = mongoose.model('category', {
    name: String
});

module.exports = {
    category
};