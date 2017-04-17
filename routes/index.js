const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.redirect("/test");
});

router.get("/test", (req, res) => {
	let recipes = [
		{	backgroundColor: "black",
			backgroundPicPath: "/public/img/city-1.jpg",
			category: "Mediterranean",
			title: "Mediterranean",
			link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady",
			description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
		},
		{	backgroundColor: "black",
			backgroundPicPath: "/public/img/city-1.jpg",
			category: "Mediterranean",
			title: "Mediterranean",
			link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady",
			description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
		}

	];
	res.render("cards/card.handlebars", {
		recipes: recipes
	});

});

const construtorMethod = (app) => {
	app.use("/", router);
};

module.exports = construtorMethod;
