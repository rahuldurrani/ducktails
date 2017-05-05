const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require("../model/user");

router.get('/', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.json({ message: req.flash('signupMessage') });
});

router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/user', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

module.exports = router;