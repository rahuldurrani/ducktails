const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipe;
const userData = data.user;
const categoryData = data.category;
const moment = require('moment');
const multer = require('multer');

let recipes = [];

router.get('/create_recipe', isLoggedIn, (req, res) => {
    let categories = [];
    let loginUserId = false;
    if (req.isAuthenticated()) {
        loginUserId = true;
    }
    categoryData.getAllCategories().then((categoryList) => {
        // res.json(categoryList);
        categoryList.map(function(category) {
            let card = {};
            card.categoryId = category._id;
            card.name = category.name;
            card.recommended = true;
            categories.push(card);
        });
        res.render("recipe/create_recipe.handlebars", { categories: categories, loginUserId });
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
    // res.render("recipe/create_recipe.handlebars", {});
});

router.post('/create_recipe', multer({ dest: './public/img/' }).single('recipePic'), (req, res) => {
    let newRecipe = {};
    let ingredients = [];
    newRecipe.title = req.body.Title;
    newRecipe.servings = req.body.serving;
    newRecipe.preptime = req.body.cookTime;
    newRecipe.description = req.body.description;
    newRecipe.category = req.body.category
    if (req.file) {
        newRecipe.recipePicPath = "/" + req.file.path;
    }
    newRecipe.steps = req.body.steps.split(/\r?\n/);
    req.body.ingredients.split(/\r?\n/).map(function(ingredient) {
        let doc = {};
        doc.name = ingredient;
        ingredients.push(doc);
    });
    newRecipe.ingredients = ingredients;

    userData.getUserById(req.user._id).then((user) => {
        let creator = {};
        creator._id = user[0]._id;
        creator.name = user[0].firstName + " " + user[0].lastName;
        newRecipe.creator = creator;
    }).then(() => {
        console.log(newRecipe);
        recipeData.addRecipe(newRecipe).then((addedRecipe) => {

            res.redirect('/' + addedRecipe._id);
        }, () => {
            res.sendStatus(500);
        });
    });

});

router.get("/:id", (req, res) => {
    let recipe = {};
    recipeData.getRecipeById(req.params.id).then((recipeDoc) => {
        recipe.recipeid = recipeDoc[0]._id;
        recipe.creatorName = recipeDoc[0].creator.name;
        recipe.id = recipeDoc[0].creator._id;
        recipe.title = recipeDoc[0].title;
        recipe.recipePicPath = recipeDoc[0].recipePicPath;
        recipe.description = recipeDoc[0].description;
        recipe.category = recipeDoc[0].category;
        if (req.isAuthenticated()) {
            recipe.loginUserId = req.user._id;
            if (mongoose.Types.ObjectId(recipe.id).equals(req.user._id)) {
                recipe.self = true;
            }
        }
        let comments = [];
        recipeDoc[0].reviews.map(function(comment) {
            comment.date = moment(comment.date).format('MM/DD/YYYY HH.mm');
            comments.push(comment);
        });
        recipe.comments = comments;
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
        recipe.createdDate = moment(recipeDoc[0].date).format('MM/DD/YYYY');
    }).then(() => {
        userData.getUserById(recipe.id).then((user) => {
            recipe.profilePicPath = user[0].profilePicPath;
            if (req.isAuthenticated()) {
                userData.getUserById(req.user._id).then((user) => {
                    if (_.find(user[0].favRecipes, req.params.id) === req.params.id) {
                        recipe.favorited = true;
                    }
                });
            }
        }).then(() => {
            res.render("recipe/recipe_detail.handlebars", recipe);
        });
    }).catch((error) => {
        // Not found!
        res.status(404).json({ message: error });
    });
});

router.get("/", (req, res) => {
    let loginUserId = false;
    if (req.isAuthenticated()) {
        loginUserId = true;
    }
    recipeData.getAllRecipes().then((recipeList) => {

        recipeList.map(function(recipe) {
            let card = {};
            let i = Math.floor(Math.random() * 3) + 1
            if (i === 1) {
                card.backgroundColor = "black";
            } else if (i == 2) {
                card.backgroundColor = "blue";
            } else {
                card.backgroundColor = "orange";
            }
            card.backgroundPicPath = recipe.recipePicPath;
            card.category = recipe.category;
            card.title = recipe.title;
            card.link = "http://www.foodandwine.com/recipes/mediterranean-pink-lady";
            card.firstName = recipe.creator.name;
            card.description = recipe.description;
            card.recipeId = recipe._id;
            card.id = recipe.creator._id;
            recipes.push(card);
        });

        res.render("recipe_cards/recipe_card.handlebars", { recipes, loginUserId })
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

router.post("/:recipeid/postComment", isLoggedIn, (req, res) => {
    userData.getUserById(req.user._id).then((user) => {
        let comment = {};
        comment.name = user[0].firstName + " " + user[0].lastName;
        comment.profilePicPath = user[0].profilePicPath;
        comment.content = req.body.message;
        recipeData.addComment(comment, req.params.recipeid).then((recipe) => {
            if (recipe) {
                res.redirect(`/recipe/${recipe._id}`);
            }
        });
    }).then(() => {}, () => {
        res.sendStatus(500);
    });
});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


module.exports = router;