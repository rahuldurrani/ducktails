const express = require('express');
const router = express.Router();
const data = require("../data");
const categoryData = data.category;

router.get("/:name", (req, res) => {
    categoryData.getCategoryByName(req.params.name).then((category) => {
        res.json(category);
    }).catch((error) => {
        // Not found!
        res.status(404).json({ message: "Category not found" });
    });
});

router.get("/", (req, res) => {
    let categories = [];
    let loginUserId = false;
    if (req.isAuthenticated()) {
        loginUserId = true;
    }
    categoryData.getAllCategories().then((categoryList) => {
        // res.json(categoryList);
        categoryList.map(function(category) {
            let card = {};
            card.categoryId = category._id;
            card.name = category.name;
            card.recommended = true;
            categories.push(card);
        });
        res.render("category/category_list.handlebars", { categories: categories, loginUserId });
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.delete("/:name", (req, res) => {
    let categoryName = req.params.name;
    let currentCategory = categoryData.removeCategory(categoryName);

    console.log("Category '" + categoryName + "' will be deleted.");

    currentCategory.then(() => {
        return categoryData.removeCategory(categoryName).then(() => {
            res.sendStatus(200);
            console.log("Deleted.");
        }).catch(() => {
            res.status(500);
        });
    }).catch(() => {
        res.status(404).json({ message: "Category not found" });
    });
});

router.post("/", (req, res) => {
    let categoryName = req.body.name;

    if (!categoryName) {
        res.status(400).json({ error: "Invalid category name!" });
    }

    categoryData.addCategory(categoryName).then((addedCategory) => {
        res.json(addedCategory);
    }, () => {
        res.sendStatus(500);
    });

});

router.put("/", (req, res) => {
    let categoryName = req.body.name;
    let updatedCategory = req.body;

    if (!categoryName) {
        res.status(400).json({ error: "Invalid category name!" });
    }
    if (!updatedCategory) {
        res.status(400).json({ error: "Invalid category arguments!" });
    }

    let currentCategory = categoryData.getCategoryByName(req.params.name);

    currentCategory.then(() => {
        return categoryData.updateCategory(updatedCategory, currentCategory.id)
            .then((resultCategory) => {
                res.json(resultCategory);
            }).catch((err) => {
                res.status(500).json({ error: err });
            });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

module.exports = router;