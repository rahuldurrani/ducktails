const express = require('express');
const router = express.Router();

demoUser1 = {
	id: 0,
	firstName: "Brandon",
	lastName: "Yuan"
}

let recipes = [
	{	backgroundColor: "black",
		backgroundPicPath: "/public/img/city-1.jpg",
		recipeId: 0,
		category: "Mediterranean",
		title: "Mediterranean",
		link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady", // TODO: action
		creator: demoUser1,
		description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
	},
	{	backgroundColor: "blue",
		backgroundPicPath: "/public/img/lifestyle-3.jpg",
		category: "Mediterranean",
		title: "Mediterranean",
		creator: demoUser1,
		description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
	},
	{	backgroundColor: "orange",
		backgroundPicPath: "/public/img/lifestyle-3.jpg",
		category: "Mediterranean",
		title: "Mediterranean",
		creator: demoUser1,
		description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
	}

];

// used for recipe page testing
let demoRecipe = {
    self: true,
    creator: {
        firstName: "Terence",
        lastName: "Feng",
        profilePicPath: "/public/img/tim.png",
        id: 0,
        personalSummary: "I pledge my honor"
    },
    category: "Pacific",
	createdDate: "Jan 15, 2017",
	title: "Cosmopolitan",
	description: "A cosmopolitan, or informally a cosmo, is a cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed or sweetened lime juice.",
	recipePicPath: "/public/img/cosmo.jpg",
	ingredients: [
		{
			index: "1",
			name: "Vodka Citron",
			amount: "4 cl"
		},
		{
			index: "2",
			name: "Cointreau",
			amount: "1.5cl"
		},
		{
			index: "3",
			name: "Fresh lime juice",
			amount: "1.5 cl"
		},
		{
			index: "4",
			name: "Cranberry juice",
			amount: "3 cl"
		}
	],
	steps: [
		{
			index: "1",
			operation: "Fill a cocktail shaker with ice then add vodka, triple sec, cranberry juice and lime juice. (We like the extra bite of extra lime juice, so we use 1/2 an ounce in our cosmopolitan cocktails. However, use what is best for your taste). Shake the cocktail shaker for about 30 seconds until well chilled. Then, strain into a martini glass."
		},
		{
			index: "2",
			operation: "Garnish with orange peel/twist. For an extra burst of flavor, peel the orange twist over the filled cocktail glass. This way, the orange oils spray into the glass."
		}
	],
	comments: [
		{
            firstName: "Kevin",
            lastName: "Nomad",
			date: "Jan 16, 2017",
			profilePicPath: "/public/img/tim.png",
			content: "Donec ipsum diam, pretium mollis dapibus risus. Nullam tindun pulvinar at interdum eget, suscipit eget felis. Pellentesque est faucibus tincidunt risus id interdum primis orci cubilla gravida id interdum eget."
		}
	]

};

// used for user profile page testing
let demoUser = {
	self: true,
	id: 0,
	profilePicPath: "/public/img/tim.png",
	firstName: "Jeffery",
    lastName: "Coddeman",
	personalSummary: "I pledge my honor that I have abided by the Stevens Honor System",
	// email: not shown in user profile page
    followers: [{
			userId: 0,
			firstName: "Brandon",
			profilePicPath: "/public/img/lifestyle-5.jpg",
			backgroundColor: "green",
			personalSummary: "I pledge my honor that I have abided by the Stevens Honor System"
		},
		{
			userId: 0,
			firstName: "Jared",
			profilePicPath: "/public/img/lifestyle-8.jpg",
			backgroundColor: "red",
			personalSummary: "I pledge my honor that I have abided by the Stevens Honor Systems"
		}
	], // TODO: numbers
    followees: [{
    }], // TODO: numbers
    recipes: recipes
};

let categories = [
	{
		recommanded: true,
		categoryId: 0,
		name: "ANCESTRALS",
		backgroundPicPath: "/public/img/lifestyle-6.jpg",
		description: "These are among the original, early 19th century-style cocktails, listed in vintage bar guides as simply \"Whiskey Cocktail\" or \"Improved Gin Cocktail\" and the like. These drinks are composed of a base spirit lightly adorned with sugar (in some cases, the sweetener appears in the form of a dash or two of liqueur such as maraschino or curacao), bitters, and water (usually in its frozen form), and served either straight up or on the rocks.",
		recipes: recipes,
	},
	{
		categoryId: 0,
		name: "ANCESTRALS",
		backgroundPicPath: "/public/img/lifestyle-8.jpg",
		description: "These are among the original, early 19th century-style cocktails, listed in vintage bar guides as simply \"Whiskey Cocktail\" or \"Improved Gin Cocktail\" and the like. These drinks are composed of a base spirit lightly adorned with sugar (in some cases, the sweetener appears in the form of a dash or two of liqueur such as maraschino or curacao), bitters, and water (usually in its frozen form), and served either straight up or on the rocks."
	}

];


router.get("/", (req, res) => {
	res.render("recipe_cards/recipe_card.handlebars", {
        require_login: true,
		recipes: recipes
	});

});

router.get("/login", (req, res) => {
    res.render("login_signup/login_signup.handlebars", {});
});

router.post("/login", (req, res) => {
	console.log(req.email);
	console.log(req.password);
	res.render("recipe_cards/recipe_card.handlebars", {
		userLink: "http://www.google.com",
		recipes: recipes
	});
});

router.post("/register", (req, res) => {
	console.log(req.email);
	console.log(req.password);
	res.render("recipe_cards/recipe_card.handlebars", {
		userLink: "http://www.google.com",
		recipes: recipes
	});

});

router.get("/user/:userId", (req, res) => {
	// TODO: retrive data from database
	res.render("user/user_profile.handlebars", demoUser);
});

router.get("/user/:id/edit_profile", (req, res) => {
	res.render("user/edit_profile.handlebars", demoUser);
});

router.get("/user/:userId/followers", (req, res) => {
	// TODO: retrive data from database
	res.render("user/user_followers.handlebars", demoUser);
});

router.get("/recipe/create_recipe", (req, res) => {
	res.render("recipe/create_recipe.handlebars", {
        categories: categories
    });
});

router.get("/recipe/edit_recipe/:recipeId", (req, res) => {
    res.render("recipe/edit_recipe.handlebars", demoRecipe);
});

router.get("/recipe/:recipeId", (req, res) => {
	// TODO: retrive data from database
	res.render("recipe/recipe_detail.handlebars", demoRecipe);
});

router.post("/search", (req, res) => {

	let keyword;
	res.render("search/search_result.handlebars", {
		searchKeyWord: keyword,
		recipes: recipes
	});
});

router.get("/category", (req, res) => {
	res.render("category/category_list.handlebars", {
		categories: categories
	});
});

router.get("/category/:id", (req, res) => {
	console.log(categories[0]);
	res.render("category/category_detail.handlebars", categories[0]);
});

router.get("/*", (req, res) => {
	res.redirect("/");
});

const construtorMethod = (app) => {
	app.use("/", router);
};

module.exports = construtorMethod;
