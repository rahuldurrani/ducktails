const { mongoose } = require('./../config/mongoose');
const { Recipe } = require('./../model/recipe');

let exportedMethods = {
    getAllRecipes() {
        return Recipe.find({}).toArray();
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
        var nrecipe = new Recipe({ newRecipe });
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
    }
}