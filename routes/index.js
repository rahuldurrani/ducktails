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

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use("/", (req, res) => {
        res.redirect('/recipe/');
    });
};

module.exports = constructorMethod;