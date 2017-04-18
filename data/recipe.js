const { mongoose } = require('./../config/mongoose');
const { Recipe } = require('./../model/recipe');

let exportedMethods = {
    getAllRecipes() {
        return Recipe.find({}, function(err, users) {
            var RecipeMap = {};
            Recipe.forEach(function(user) {
                RecipeMap[user._id] = user;
            });
            return RecipeMap;
        });
    },
    getRecipeById(id) {
        return Recipe.find({
            _id: id
        }).then((recipe) => {
            return recipe;
        }).catch((error) => {
            return error;
        });
    },
    addRecipe(newRecipe) {
        var nrecipe = new Recipe(newRecipe);
        return nrecipe.save(newRecipe).then((recipe) => {
            return recipe;
        }).catch((error) => {
            return error;
        });
    },
    removeRecipeById(id) {
        return Recipe.findOneAndRemove({ _id: id }).then((recipe) => {
            return recipe;
        }).catch((error) => {
            return error;
        });
    },
    updateRecipe(recipe, id) {
        if (!ObjectID.isValid(id)) {
            throw "Invalid ObjectID";
        }
        return Recipe.findOneAndUpdate({
            _id: id
        }, {
            $set: recipe
        }, {
            new: true
        }).then((recipe) => {
            return recipe;
        }).catch((error) => {
            return error;
        })
    }
}
module.exports = exportedMethods;