const recipeRoutes = require("./recipe");
const categoryRoutes = require("./category");
const userRoutes = require("./user");

const constructorMethod = (app) => {
    app.use("/recipe", recipeRoutes);
    app.use("/category", categoryRoutes);
    app.use("/user", userRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;