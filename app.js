if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}


const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoSanitize = require('express-mongo-sanitize');

//require routers
const campgroundRoutes = require("./routes/campground.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");

//User model
const User = require("./models/user.js");


//use db yelp-camp
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(d => {
    console.log("CONNECT TO MONGODB");
})
.catch(err => {
    console.log("ERROR TO CONNECT TO MONGODB");
    console.log(err);
});



//views setup
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    name: "blahblah",
    secret: "THISSHOULDBEBETTERSECRET",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true, //not working for our localhost website, but for http, should included
        expires: Date.now() + 1000 * 60 * 60 *24 * 7,
        maxAge: 1000 * 60 * 60 *24 * 7,
    }
}));
app.use(flash());
app.use(mongoSanitize());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to set up the flash
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

//use routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/users", userRoutes);


//home page
app.get("/", (req, res) => {
    //res.send("HEEE");
    res.render("home.ejs");
});



app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})


//Error message
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message="Something Went Wrong!";
    res.status(statusCode).render("error.ejs", {err});
})



let port = 3000;
app.listen(port, () => {
    console.log(`CONNECTION ON PORT ${port}`);
})