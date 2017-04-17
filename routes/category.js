const express = require('express');
const router = express.Router();
const data = require("../data");
const categoryData = data.category;

router.get("/:name", (req, res) => {
    categoryData.allCategory(req.params.name).then((category) => {
        res.json(category);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "Category not found"});
    });
});

router.get("/", (req, res) => {
    categoryData.getAllCategories().then((categoryList) => {
        res.json(categoryList);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

module.exports = router;