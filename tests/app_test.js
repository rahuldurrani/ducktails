const express = require("express");
let app = express();
let configRoutes = require("../routes");

configRoutes(app);

app.listen(5000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:5000");
});
