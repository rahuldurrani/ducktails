// const express = require('express');
// const router = express.Router();

// demoUser1 = {
// 	id: 0,
// 	firstName: "Brandon",
// 	lastName: "Yuan"
// }

// let recipes = [
// 	{	backgroundColor: "black",
// 		backgroundPicPath: "/public/img/city-1.jpg",
// 		category: "Mediterranean",
// 		title: "Mediterranean",
// 		link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady", // TODO: action
// 		creator: demoUser1,
// 		description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
// 	},
// 	{	backgroundColor: "blue",
// 		backgroundPicPath: "/public/img/lifestyle-3.jpg",
// 		category: "Mediterranean",
// 		title: "Mediterranean",
// 		creator: demoUser1,
// 		description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
// 	},
// 	{	backgroundColor: "orange",
// 		backgroundPicPath: "/public/img/lifestyle-3.jpg",
// 		category: "Mediterranean",
// 		title: "Mediterranean",
// 		creator: demoUser1,
// 		description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
// 	}

// ];



// let demoUser = {
// 	self: true,
// 	id: 0,
// 	profilePicPath: "/public/img/tim.png",
// 	firstName: "Jeffery",
//     lastName: "Coddeman",
// 	personalSummary: "I pledge my honor that I have abided by the Stevens Honor System",
// 	// email: not shown in user profile page
//     followers: [{
// 			userId: 0,
// 			firstName: "Brandon",
// 			profilePicPath: "/public/img/lifestyle-5.jpg",
// 			backgroundColor: "green",
// 			personalSummary: "I pledge my honor that I have abided by the Stevens Honor System"
// 		},
// 		{
// 			userId: 0,
// 			firstName: "Jared",
// 			profilePicPath: "/public/img/lifestyle-8.jpg",
// 			backgroundColor: "red",
// 			personalSummary: "I pledge my honor that I have abided by the Stevens Honor Systems"
// 		}
// 	], // TODO: numbers
//     followees: [{
//     }], // TODO: numbers
//     recipes: recipes
// };

// let categories = [
// 	{
// 		recommanded: true,
// 		categoryId: 0,
// 		name: "ANCESTRALS",
// 		backgroundPicPath: "/public/img/lifestyle-6.jpg",
// 		description: "These are among the original, early 19th century-style cocktails, listed in vintage bar guides as simply \"Whiskey Cocktail\" or \"Improved Gin Cocktail\" and the like. These drinks are composed of a base spirit lightly adorned with sugar (in some cases, the sweetener appears in the form of a dash or two of liqueur such as maraschino or curacao), bitters, and water (usually in its frozen form), and served either straight up or on the rocks.",
// 		recipes: recipes,
// 	},
// 	{
// 		categoryId: 0,
// 		name: "ANCESTRALS",
// 		backgroundPicPath: "/public/img/lifestyle-8.jpg",
// 		description: "These are among the original, early 19th century-style cocktails, listed in vintage bar guides as simply \"Whiskey Cocktail\" or \"Improved Gin Cocktail\" and the like. These drinks are composed of a base spirit lightly adorned with sugar (in some cases, the sweetener appears in the form of a dash or two of liqueur such as maraschino or curacao), bitters, and water (usually in its frozen form), and served either straight up or on the rocks."
// 	}

// ];


// router.get("/", (req, res) => {
// 	res.render("recipe_cards/recipe_card.handlebars", {
//         require_login: true,
// 		recipes: recipes
// 	});

// });

// router.post("/login", (req, res) => {
// 	console.log(req.email);
// 	console.log(req.password);
// 	res.render("recipe_cards/recipe_card.handlebars", {
// 		userLink: "http://www.google.com",
// 		recipes: recipes
// 	});
// });

// router.post("/register", (req, res) => {
// 	console.log(req.email);
// 	console.log(req.password);
// 	res.render("recipe_cards/recipe_card.handlebars", {
// 		userLink: "http://www.google.com",
// 		recipes: recipes
// 	});

// });

// router.get("/user/:userId", (req, res) => {
// 	// TODO: retrive data from database
// 	res.render("user/user_profile.handlebars", demoUser);
// });

// router.get("/user/:id/edit_profile", (req, res) => {
// 	res.render("user/edit_profile.handlebars", demoUser);
// });

// router.get("/user/:userId/followers", (req, res) => {
// 	// TODO: retrive data from database
// 	res.render("user/user_followers.handlebars", demoUser);
// });

// router.get("/recipe/create_recipe", (req, res) => {
// 	res.render("recipe/create_recipe.handlebars", {
//         categories: categories
//     });
// });

// router.get("/recipe/:recipeId", (req, res) => {
// 	// TODO: retrive data from database
// 	res.render("recipe/recipe_detail.handlebars", demoRecipe);
// });

// router.post("/search", (req, res) => {

// 	let keyword;
// 	res.render("search/search_result.handlebars", {
// 		searchKeyWord: keyword,
// 		recipes: recipes
// 	});
// });

// router.get("/category", (req, res) => {
// 	res.render("category/category_list.handlebars", {
// 		categories: categories
// 	});
// });

// router.get("/category/:id", (req, res) => {
// 	console.log(categories[0]);
// 	res.render("category/category_detail.handlebars", categories[0]);
// });

// router.get("/*", (req, res) => {
// 	res.redirect("/");
// });

// const construtorMethod = (app) => {
// 	app.use("/", router);

const recipeRoutes = require("./recipe");
const categoryRoutes = require("./category");
const userRoutes = require("./user");
const loginRoute = require("./login");
const signupRoute = require("./signup");

const constructorMethod = (app) => {
    app.use("/recipe", recipeRoutes);
    app.use("/category", categoryRoutes);
    app.use("/user", userRoutes);
    app.use("/login", loginRoute);
    app.use("/signup", signupRoute);


    app.use("*", (req, res) => {
        res.redirect('/recipe/');
    });
};

module.exports = constructorMethod;