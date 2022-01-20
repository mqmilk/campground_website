const express = require("express");
const router = express.Router();
const passport = require("passport");


//model
const User = require("../models/user.js");
const users = require("../controllers/users.js");



//error utilities
const catchAsync = require("../utilities/catchAsync");

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/users/login"}), catchAsync(users.login))

router.get("/logout", users.logout);

module.exports = router;