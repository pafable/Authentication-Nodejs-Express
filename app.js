var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost/authDemo");

var app = express();
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "WTF Breh!!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//====================================
//  ROUTES
//====================================

app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret", function(req,res){
    res.render("secret");
});

//====================================
//  Auth Routes
//Show sign up form
app.get("/register", function(req,res){
    res.render("register");
});

app.listen(80, process.env.IP, function(){
    console.log("SERVER STARTED");
});