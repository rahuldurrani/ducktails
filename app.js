const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const configRoutes = require("./routes");

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

const { User } = require('./model/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/public', static);
app.engine('handlebars', handlebarInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("The routes will be running on htyp://localhost:3000");
});