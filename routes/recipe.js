const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/:id", (req, res) => {
    recipeData.getRecipeById(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "Recipe not found"});
    });
});

router.get("/", (req, res) => {
    recipeData.getAllRecipes().then((recipeList) => {
        res.json(recipeList);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    let newRecipe = req.body;
    
    if (!newRecipe) {
        res.status(400).json({ error: "Invalid recipe arguments!"});
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
            res.status(500).json({error: err});
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
        res.status(404).json({message: "Recipe not found"});
    });
});


module.exports = router;