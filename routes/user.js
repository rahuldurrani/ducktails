const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.user;
const recipeData = data.recipe;
const multer = require('multer');

router.get("/followers", isLoggedIn, (req, res) => {
    // TODO: retrive data from database
    createUserTemplate(req.user._id, true, true).then((userTemplate) => {
        //console.log(userTemplate);
        res.render("user/user_followers.handlebars", userTemplate);
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/followees", isLoggedIn, (req, res) => {
    // TODO: retrive data from database
    createUserTemplate(req.user._id, true, true).then((userTemplate) => {
        //console.log(userTemplate);
        res.render("user/user_followees.handlebars", userTemplate);
        //res.json(userTemplate);
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/favorite/:id", isLoggedIn, (req, res) => {
    userData.favRecipe(req.user._id, req.params.id).then((user) => {
        res.redirect(`/recipe/${req.params.id}`);
    });
});

router.get("/follow/:userid", isLoggedIn, (req, res) => {
    userData.getUserById(req.user._id).then((myUser) => {
        let myDetails = {};
        myDetails.userId = myUser[0]._id;
        myDetails.firstName = myUser[0].firstName;
        myDetails.profilePicPath = myUser[0].profilePicPath;
        myDetails.backgroundColor = "green";
        myDetails.personalSummary = myUser[0].personalSummary;

        userData.getUserById(req.params.userid).then((userToFollow) => {
            let followerDetails = {};
            followerDetails.userId = myUser[0]._id;
            followerDetails.firstName = myUser[0].firstName;
            followerDetails.profilePicPath = myUser[0].profilePicPath;
            followerDetails.backgroundColor = "green";
            followerDetails.personalSummary = myUser[0].personalSummary;
            userData.followUser(req.user._id, myDetails, req.params.userid, followerDetails).then(() => {
                res.redirect(`/user/${req.params.userid}`);
            })
        });
    });
});

router.get("/editprofile", isLoggedIn, (req, res) => {
    userData.getUserById(req.user._id).then((currentUser) => {
        let user = {};
        user.profilePicPath = currentUser[0].profilePicPath;
        user.followers = currentUser[0].followers;
        user.followees = currentUser[0].followees;
        user.firstName = currentUser[0].firstName;
        user.lastName = currentUser[0].lastName;
        user.personalSummary = currentUser[0].personalSummary;
        user.self = true;
        user.loginUserId = currentUser[0]._id;
        res.render("user/edit_profile.handlebars", user);
    });
});

router.post("/editprofile", isLoggedIn, multer({ dest: './public/img/' }).single('profilePic'), (req, res) => {
    let updatedUser = {};
    updatedUser.firstName = req.body.firstName;
    updatedUser.lastName = req.body.lastName;
    updatedUser.personalSummary = req.body.personalSummary;
    if (req.file) {
        updatedUser.profilePicPath = "/" + req.file.path;
    }
    userData.updateUser(updatedUser, req.user._id).then((resultUser) => {
        res.redirect("/user");
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user._id.toString() === req.params.id) {
            res.redirect("/user");
        } else {
            createUserTemplate(req.params.id, false, req.params.id).then((userTemplate) => {
                res.render("user/user_profile.handlebars", userTemplate);
            });
        }
    } else {
        createUserTemplate(req.params.id, false).then((userTemplate) => {
            res.render("user/user_profile.handlebars", userTemplate);
        });
    }

});

router.delete("/:id", (req, res) => {
    let userId = req.params.id;
    let currentUser = userData.getUserById(userId);

    console.log("User with ID " + userId + " will be deleted.");
});


router.get("/", isLoggedIn, (req, res) => {
    createUserTemplate(req.user._id, true, req.user._id).then((userTemplate) => {
        res.render("user/user_profile.handlebars", userTemplate);
    });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

function createUserTemplate(id, self, loginUserId) {
    return userData.getUserById(id).then((user) => {
        userTemplate = {};
        userTemplate.userId = id;
        userTemplate.firstName = user[0].firstName;
        userTemplate.lastName = user[0].lastName;
        userTemplate.profilePicPath = user[0].profilePicPath;
        userTemplate.loginUserId = loginUserId;
        userTemplate.self = self;
        userTemplate.personalSummary = user[0].personalSummary;
        userTemplate.followees = user[0].followees;
        userTemplate.followers = user[0].followers;
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
                card.category = recipe.category;
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