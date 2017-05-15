const { mongoose } = require('./../config/mongoose');
const { User } = require('../model/user');
const { ObjectID } = require('mongodb');

let exportedMethods = {
    getAllUsers() {
        return User.find({}, function(err, users) {
            var userMap = {};
            users.forEach(function(user) {
                userMap[user._id] = user;
            });
            return userMap;
        });
    },
    getUserById(id) {
        return User.find({ _id: id }).then((user) => {
            if (!user) throw "No such user found";
            return user;
        });
    },
    addUser(newUser) {
        var user = new User(newUser);
        return user.save(newUser).then((doc) => {
            return doc;
        }).catch((error) => {
            return error;
        });
    },
    updateUser(user, id) {
        if (!ObjectID.isValid(id)) {
            throw "Invalid ObjectID";
        }
        return User.findOneAndUpdate({
            _id: id
        }, {
            $set: user
        }, {
            new: true
        }).then((user) => {
            if (!user) {
                return;
            }
            return user;
        }).catch((error) => {
            return error;
        });
    },
    favRecipe(userid, recipeid) {
        let favRecipes = { recipeid };
        return User.findOneAndUpdate({
            _id: userid
        }, {
            $push: { favRecipes: favRecipes }
        }, {
            safe: true,
            upsert: true
        }).then((user) => {
            return user;
        }).catch((error) => {
            return error;
        });
    },
    followUser(id, myDetails, followerid, followerDetails) {
        return User.findOneAndUpdate({
            _id: id
        }, {
            $push: { followees: followerDetails }
        }, {
            safe: true,
            upsert: true
        }).then((user) => {
            return User.findOneAndUpdate({
                _id: followerid
            }, {
                $push: { followers: myDetails }
            }, {
                safe: true,
                upsert: true
            }).then((user1) => {
                return user1;
            });
        }).catch((error) => {
            return error;
        });
    }
};

module.exports = exportedMethods;