const express = require('express');
const router = express.Router();
const data = require("../data");
const { User } = require("../model/user");
const userData = data.user;
const recipeData = data.recipe;

// let userTemplate = {};
router.get("/", isLoggedIn, (req, res) => {
    createUserTemplate(req.user._id).then((userTemplate) => {
        res.render("user/user_profile.handlebars", userTemplate);
    });
});

router.post("/newUser", (req, res) => {
    let newUser = req.body;

    if (!newUser) {
        res.status(400).json({ error: "Invalid user arguments!" });
    }

    userData.addUser(newUser).then((addedUser) => {
        res.json(addedUser);
    }, () => {
        res.sendStatus(500);
    });

});

router.put("/:id", (req, res) => {
    let updatedUser = req.body;

    let currentUser = userData.getUserById(req.params.id);

    currentUser.then(() => {
        return userData.updateUser(updatedUser, req.params.id)
            .then((resultUser) => {
                res.json(resultUser);
            }).catch((err) => {
                res.status(500).json({ error: err });
            });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
    let userId = req.params.id;
    let currentUser = userData.getUserById(userId);

    console.log("User with ID " + userId + " will be deleted.");
});

router.get("/followers", isLoggedIn, (req, res) => {
    // TODO: retrive data from database
    createUserTemplate(req.user._id).then((userTemplate) => {
        res.render("user/user_followers.handlebars", userTemplate);
    }).catch((error) => {
        console.log(error);
    });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/123');
}

function createUserTemplate(id) {
    return userData.getUserById(id).then((user) => {
        userTemplate = {};
        userTemplate.firstName = user[0].firstName;
        userTemplate.lastName = user[0].lastName;
        userTemplate.profilePicPath = user[0].profilePicPath;
        userTemplate.recipes = [];

        recipeData.getAllRecipesForUser(id).then((recipeList) => {
            recipeList.map(function(recipe, i) {
                let card = {};
                if (i + 1 % 1 === 0) {
                    card.backgroundColor = "black";
                } else if (i + 1 % 2 === 0) {
                    card.backgroundColor = "blue";
                } else {
                    card.backgroundColor = "orange";
                }
                card.backgroundPicPath = recipe.recipePicPath;
                card.category = 'Mediterranean';
                card.title = recipe.title;
                card.link = "http://www.foodandwine.com/recipes/mediterranean-pink-lady";
                card.firstName = recipe.creator.name;
                card.description = recipe.description;
                card.recipeId = recipe._id;
                card.id = recipe.creator._id;
                userTemplate.recipes.push(card);
            });
        });
        return userTemplate;
    }).catch((error) => {
        return error;
    });
}
module.exports = router;