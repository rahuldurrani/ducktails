const express = require('express');
const router = express.Router();
const data = require("../data");
const { User } = require("../model/user");
const userData = data.user;
const recipeData = data.recipe;
const passport = require('passport');

router.post("/", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.json(err);
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});

module.exports = router;