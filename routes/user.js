const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.user;

router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        res.json(user);
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