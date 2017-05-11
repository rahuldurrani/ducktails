const express = require('express');
const data = require("../data");
const categoryData = data.category;

function addData(categoryName) {
    
    if (!categoryName) {
        console.log(`Invalid category name!`);
    }

    categoryData.addCategory(categoryName).then((addedCategory) => {
        console.log(addedCategory);
    }, () => {
    });

};

addData("classic");
addData("date-night");
addData("for-da-boys");
addData("girls-just-wanna-have-fun");
addData("skinny");
addData("student-budget");
