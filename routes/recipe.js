const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipe;

let recipes = [];
router.get("/:id", (req, res) => {
    recipeData.getRecipeById(req.params.id).then((recipeDoc) => {
        // res.json(recipe);
        let recipe = {};
        recipe.creatorName = recipeDoc[0].creator.name;
        recipe.title = recipeDoc[0].title;
        recipe.description = recipeDoc[0].description;
        let ingredients = [];
        recipeDoc[0].ingredients.map(function(ingr, i) {
            let ingredient = {};
            ingredient.index = i + 1;
            ingredient.name = ingr.name;

            ingredients.push(ingredient);
        });
        recipe.ingredients = ingredients;
        let steps = [];
        recipeDoc[0].steps.map(function(stp, i) {
            let step = {};
            step.index = i + 1;
            step.operation = stp;

            steps.push(step);
        });
        recipe.steps = steps;
        recipe.createdDate = recipeDoc[0].date;
        res.render("recipe/recipe_detail.handlebars", recipe);
    }).catch((error) => {
        // Not found!
        res.status(404).json({ message: error });
    });
});

router.get("/", (req, res) => {
    recipeData.getAllRecipes().then((recipeList) => {
        // res.json(recipeList);
        recipeList.map(function(recipe, i) {
            let card = {};
            if (i + 1 % 1 === 0) {
                card.backgroundColor = "black";
            } else if (i + 1 % 2 === 0) {
                card.backgroundColor = "blue";
            } else {
                card.backgroundColor = "orange";
            }
            card.backgroundPicPath = '/public/img/city-1.jpg';
            card.category = 'Mediterranean';
            card.title = recipe.title;
            card.link = "http://www.foodandwine.com/recipes/mediterranean-pink-lady";
            card.firstName = recipe.creator.name;
            card.description = recipe.description;
            card.recipeId = recipe._id;
            card.id = recipe.creator._id;
            recipes.push(card);
        });
        res.render("recipe_cards/recipe_card.handlebars", { recipes: recipes })
        recipes = [];
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    let newRecipe = req.body;

    if (!newRecipe) {
        res.status(400).json({ error: "Invalid recipe arguments!" });
    }

    recipeData.addRecipe(newRecipe).then((addedRecipe) => {
        res.json(addedRecipe);
    }, () => {
        res.sendStatus(500);
    });

});

router.put("/:id", (req, res) => {
    let updatedRecipe = req.body;

    let currentRecipe = recipeData.getRecipeById(req.params.id);

    currentRecipe.then(() => {
        return recipeData.updateRecipe(updatedRecipe, req.params.id)
            .then((resultRecipe) => {
                res.json(resultRecipe);
            }).catch((err) => {
                res.status(500).json({ error: err });
            });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
    let recipeId = req.params.id;
    let currentRecipe = recipeData.getRecipeById(recipeId);

    console.log("Recipe with Id " + recipeId + " will be deleted.");

    currentRecipe.then(() => {
        return recipeData.removeRecipeById(recipeId).then(() => {
            res.sendStatus(200);
            console.log("Deleted.");
        }).catch(() => {
            res.status(500);
        });
    }).catch(() => {
        res.status(404).json({ message: "Recipe not found" });
    });
});


module.exports = router;