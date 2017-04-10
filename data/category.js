const { mongoose } = require('./../config/mongoose');
const category = require('./../model/category');

let exportedMethods = {
    getAllCategories() {
        return category.find({}).toArray();
    },
    allCategory(name) {
        var cat = new category({
            name: name
        });

        return cat.save().then((doc) => {
            return doc;
        }, (error) => {
            return error;
        });
    }
}