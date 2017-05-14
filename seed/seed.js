const express = require('express');
const data = require("../data");
const categoryData = data.category;

function addData(categoryName, bpicpath, desc) {

    if (!categoryName) {
        console.log(`Invalid category name!`);
    }

    categoryData.addCategory(categoryName, bpicpath, desc).then((addedCategory) => {
        console.log(addedCategory);
    }, () => {});

};

addData("classic", "/public/img/classic.png", "Collection of our classic recipes");
addData("date-night", "/public/img/datenight.jpeg", "For that special night");
addData("for-da-boys", "/public/img/fordaboys.jpeg", "BoyZone!!");
addData("girls-just-wanna-have-fun", "/public/img/girlsjustwannahavefun.jpeg", "Why should guys have all the fun!");
addData("skinny", "/public/img/skinny.jpeg", "You can never get enough");
addData("student-budget", "/public/img/budget.jpeg", "Student Zone!");