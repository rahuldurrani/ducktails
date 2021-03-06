const { mongoose } = require('./../config/mongoose');
const { Recipe } = require('./../model/recipe');

let exportedMethods = {
    getAllRecipes() {
        return Recipe.find({}, function(err, recipe) {
            var RecipeMap = {};
            recipe.forEach(function(user) {
                RecipeMap[user._id] = user;
            });
            return RecipeMap;
        });
    },
    getAllRecipesForUser(userId) {
        return Recipe.find({ "creator._id": userId }, function(err, recipe) {
            var RecipeMap = {};
            recipe.forEach(function(user) {
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
    getRecipeByCategory(name) {
        return Recipe.find({
            category: name
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
    },
    addComment(comment, id) {
        return Recipe.findOneAndUpdate({
            _id: id
        }, {
            $push: { reviews: comment }
        }, {
            safe: true,
            upsert: true
        }).then((recipe) => {
            return recipe;
        }).catch((error) => {
            return error;
        })
    }
}
module.exports = exportedMethods;