const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');

const configRoutes = require("./routes");

const handlebarInstance = exphbs.create({
	defaultLayout: 'main.handlebars'
});

app.use('/public', static);
app.engine('handlebars', handlebarInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
	console.log("The routes will be running on htyp://localhost:3000");
});
