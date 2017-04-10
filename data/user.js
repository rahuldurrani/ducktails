const { mongoose } = require('./../config/mongoose');
const User = require('../model/user');

let exportedMethods = {
    getAllUsers() {
        return User.find({}).toArray();
    },
    getUserById(id) {
        return User.find({ _id: id }).then((user) => {
            if (!user) throw "No such user found";
            return user;
        });
    },
    addUser(newUser, password) {
        return User.register(newUser, password, function(err, user) {
            if (err) {
                // handle the error
            }
            return user;
        });
    },
    updateUser(user, id) {
        return User.findOneAndUpdate({
            _id: id
        }, {
            $set: user
        }, {
            new: true
        }).then((user) => {
            if (!todo) {
                return;
            }
            return todo;
        }).catch((error) => {
            return error;
        });
    },
    deleteUser(id) {

    }
};

module.exports = { exportedMethods };