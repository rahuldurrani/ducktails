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
    // addUser(newUser, password) {
    //     return User.register(newUser, password, function(err, user) {
    //         if (err) {
    //             // handle the error
    //         }
    //         return user;
    //     });
    // },
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
    deleteUser(id) {

    }
};

module.exports = exportedMethods;