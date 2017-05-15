const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const configRoutes = require("./routes");

const port = process.env.PORT || 4000;
const handlebarInstance = exphbs.create({
    defaultLayout: 'main.handlebars'
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);

app.use('/public', static);
app.engine('handlebars', handlebarInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(port, () => {
    console.log(`Started up at Port: ${port}`);
});