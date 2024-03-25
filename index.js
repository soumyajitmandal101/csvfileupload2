const express = require("express");
const dotenv = require('dotenv');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./config/mongoose");
require('./config/passport-local-startegy'); 
const port = process.env.PORT || 8000;

dotenv.config({path: 'config/.env'});

const app = express();
// ejs views engine
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.json());
app.use(
    session({
        secret: 'hi',
        
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 100 },
    })
);

app.set('layout extractStyle', true);
app.set('layout extractScript', true);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets'));


// authenticate
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); 


// express router
app.use('/', require("./routes"));

app.listen(port, function(error) {
    if (error) {
        console.log(`error in connecting : ${error}`);
        return;
    }
    console.log(`server running on port: ${port}`);
});
