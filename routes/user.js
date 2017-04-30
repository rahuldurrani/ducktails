const express = require('express');
const router = express.Router();
const data = require("../data");
const { User } = require("../model/user");
const userData = data.user;
const recipeData = data.recipe;
const passport = require('passport');

let recipes = [];
router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        let userTemplate = {};
        userTemplate.firstName = user[0].firstName;
        userTemplate.lastName = user[0].lastName;
        userTemplate.recipes = [];

        recipeData.getAllRecipesForUser(req.params.id).then((recipeList) => {
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
                userTemplate.recipes.push(card);
            });
        })
        res.render("user/user_profile.handlebars", userTemplate);
    }).catch((error) => {
        // Not found!
        res.status(404).json({ message: "User not found" });
    });
});

router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
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

    // currentUser.then(() => {
    //     return userData.deleteUser(userId).then(() => {
    //         res.sendStatus(200);
    //         console.log("Deleted.");
    //     }).catch(() => {
    //         res.status(500);
    //     });
    // }).catch(() => {
    //     res.status(404).json({message: "User not found"});
    // });
});


module.exports = router;