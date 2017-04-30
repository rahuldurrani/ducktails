// //<<<<<<< terence
// const express = require('express');
// const router = express.Router();
// const data = require("../data");
// const recipeData = data.recipe;

// let recipes = [{
//         backgroundColor: "black",
//         backgroundPicPath: "/public/img/city-1.jpg",
//         category: "Mediterranean",
//         title: "Mediterranean",
//         link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady", // TODO: action
//         posterLink: "http://www.google.com",
//         posterName: "Terence",
//         description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
//     },
//     {
//         backgroundColor: "blue",
//         backgroundPicPath: "/public/img/lifestyle-3.jpg",
//         category: "Mediterranean",
//         title: "Mediterranean",
//         link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady",
//         posterLink: "http://www.google.com",
//         posterName: "Terence",
//         description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
//     },
//     {
//         backgroundColor: "orange",
//         backgroundPicPath: "/public/img/lifestyle-3.jpg",
//         category: "Mediterranean",
//         title: "Mediterranean",
//         link: "http://www.foodandwine.com/recipes/mediterranean-pink-lady",
//         posterLink: "http://www.google.com",
//         posterName: "Terence",
//         description: "Angus Winchester loves limoncello and Campari and wanted to combine them in a classic-style (that is, not overly esoteric or fussy) cocktail. The result is a pretty pink drink that's citrusy and crisp."
//     }

// ];
// used for recipe page testing
// let demoRecipe = {
//     creatorName: "Terence",
//     createrProfileLink: "http://www.google.com",
//     creatorProfilePicPath: "/public/img/tim.png",
//     createdDate: "Jan 15, 2017",
//     personalSummary: "Love with ducktails",
//     title: "Cosmopolitan",
//     description: "A cosmopolitan, or informally a cosmo, is a cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed or sweetened lime juice.",
//     recipePicPath: "/public/img/cosmo.jpg",
//     ingredients: [{
//             ingredientIndex: "1",
//             ingredientName: "Vodka Citron",
//             ingredientAmount: "4 cl"
//         },
//         {
//             ingredientIndex: "2",
//             ingredientName: "Cointreau",
//             ingredientAmount: "1.5cl"
//         },
//         {
//             ingredientIndex: "3",
//             ingredientName: "Fresh lime juice",
//             ingredientAmount: "1.5 cl"
//         },
//         {
//             ingredientIndex: "4",
//             ingredientName: "Cranberry juice",
//             ingredientAmount: "3 cl"
//         }
//     ],
//     steps: [{
//             index: "1",
//             operation: "Fill a cocktail shaker with ice then add vodka, triple sec, cranberry juice and lime juice. (We like the extra bite of extra lime juice, so we use 1/2 an ounce in our cosmopolitan cocktails. However, use what is best for your taste). Shake the cocktail shaker for about 30 seconds until well chilled. Then, strain into a martini glass."
//         },
//         {
//             index: "2",
//             operation: "Garnish with orange peel/twist. For an extra burst of flavor, peel the orange twist over the filled cocktail glass. This way, the orange oils spray into the glass."
//         }
//     ],
//     comments: [{
//         name: "Kevin Nomad",
//         date: "Jan 16, 2017",
//         profilePicPath: "/public/img/tim.png",
//         content: "Donec ipsum diam, pretium mollis dapibus risus. Nullam tindun pulvinar at interdum eget, suscipit eget felis. Pellentesque est faucibus tincidunt risus id interdum primis orci cubilla gravida id interdum eget."
//     }]

// };

// used for user profile page testing
// let demoUser = {
//     profilePicPath: "/public/img/tim.png",
//     firstName: "Terence",
//     lastName: "Feng",
//     personalSummary: "I pledge my honor that I have abided by the Stevens Honor System",
//     // email: not shown in user profile page
//     followers: [{
//             userId: 0,
//             firstName: "Brandon",
//             profilePicPath: "/public/img/lifestyle-5.jpg",
//             backgroundColor: "green",
//             personalSummary: "I pledge my honor that I have abided by the Stevens Honor System"
//         },
//         {
//             userId: 0,
//             firstName: "Jared",
//             profilePicPath: "/public/img/lifestyle-8.jpg",
//             backgroundColor: "red",
//             personalSummary: "I pledge my honor that I have abided by the Stevens Honor Systems"
//         }
//     ], // TODO: numbers
//     followees: [{}], // TODO: numbers
//     recipes: recipes
// };

// router.get("/", (req, res) => {
//     res.render("recipe_cards/recipe_card.handlebars", {
//         recipes: recipes
//     });

// });

// router.post("/login", (req, res) => {
//     console.log(req.email);
//     console.log(req.password);
//     res.render("recipe_cards/recipe_card.handlebars", {
//         userLink: "http://www.google.com",
//         recipes: recipes
//     });
// });

// router.post("/register", (req, res) => {
//     console.log(req.email);
//     console.log(req.password);
//     res.render("recipe_cards/recipe_card.handlebars", {
//         userLink: "http://www.google.com",
//         recipes: recipes
//     });

// });

// router.get("/user/:userId", (req, res) => {
//     // TODO: retrive data from database
//     res.render("user/user_profile.handlebars", demoUser);
// });

// router.get("/user/:userId/followers", (req, res) => {
//     // TODO: retrive data from database
//     res.render("user/user_followers.handlebars", demoUser);
// });

// router.get("/recipe/:recipeId", (req, res) => {
//     // TODO: retrive data from database
//     res.render("recipe/recipe_detail.handlebars", demoRecipe);
// });

// router.get("/*", (req, res) => {
//     res.redirect("/");
// });

// const construtorMethod = (app) => {
//     app.use("/", router);
// };

// module.exports = construtorMethod;

const recipeRoutes = require("./recipe");
const categoryRoutes = require("./category");
const userRoutes = require("./user");
const signupRoutes = require("./signup");

const constructorMethod = (app) => {
    app.use("/recipe", recipeRoutes);
    app.use("/category", categoryRoutes);
    app.use("/user", userRoutes);
    app.use("/signup", signupRoutes);

    app.use("*", (req, res) => {
        res.redirect('/recipe/');
    });
};

module.exports = constructorMethod;