const { mongoose } = require('./../config/mongoose');
const { category } = require('./../model/category');

let exportedMethods = {
    getAllCategories() {
        return category.find({}).toArray();
    },
    addCategory(name) {
        var cat = new category({
            name: name
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