const express = require("express");
const app = express();
const configRoutes = require("../routes");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

configRoutes(app);

app.listen(5000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:5000");
});
