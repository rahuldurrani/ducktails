const { mongoose } = require('./../config/mongoose');
const { category } = require('./../model/category');

let exportedMethods = {
    getAllCategories() {
        return category.find({}, function(err, cat) {
            var categoryMap = {};
            cat.forEach(function(user) {
                categoryMap[user._id] = user;
            });
            return categoryMap;
        });
    },
    addCategory(name, backgroundPicPath, description) {
        var cat = new category({
            name: name,
            backgroundPicPath: backgroundPicPath,
            description: description
        });

        return cat.save().then((doc) => {
            return doc;
        }, (error) => {
            return error;
        });
    },
    removeCategory(name) {
        return category.findOneAndRemove({
            name: name
        }).then((cat) => {
            return cat;
        }).catch((error) => {
            return error;
        })
    },
    getCategoryByName(name) {
        return category.find({ name: name }).then((cat) => {
            return cat;
        }).catch((error) => {
            return error;
        });
    },
    updateCategory(cat, id) {
        if (!ObjectID.isValid(id)) {
            throw "Invalid ObjectID";
        }
        return category.findOneAndUpdate({
            _id: id
        }, {
            $set: cat
        }, {
            new: true
        }).then((cat) => {
            return cat;
        }).catch((error) => {
            return error;
        })
    }
}

module.exports = exportedMethods;