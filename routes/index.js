const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.redirect("/test");
});

router.get("/test", (req, res) => {
	/*
	 * res.render("cards/card_color", {
	 *     backgroundColor: "orange",
	 *     category: "Mideast",
	 *     link: "#",
	 *     title: "Qatar Special",
	 *     description: "..."
	 * });
	 */
	res.render("cards/card_half_pic_half_color.handlebars", {
		backgroundColor: "black",
		backgroundPicPath: "/public/img/city-1.jpg",
		category: "Mediterranean",
		title: "Mediterranean",
		link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady",
		description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
	});


});

const construtorMethod = (app) => {
	app.use("/", router);
};

module.exports = construtorMethod;
