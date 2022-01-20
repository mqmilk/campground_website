const express = require("express");
const Joi = require("joi");
const Campground = require("../models/campground");
const Review = require("../models/review");

const ExpressError = require("./ExpressError");
const {schemaCamp, schemaReview} = require("./validateSchema");

//middleware for Campground Model
module.exports.validateCampground = (req, res, next) => {
    
    const {error} = schemaCamp.validate(req.body);
    
    if(error){
        const msg = error.details.map(detail => detail.message).join(",");
        console.log(req.body);
        throw new ExpressError(400, msg);
    }else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    
    const {error} = schemaReview.validate(req.body);
    
    if(error){
        const msg = error.details.map(detail => detail.message).join(",");
        console.log(req.body);
        throw new ExpressError(400, msg);
    }else {
        next();
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.oriUrl = req.originalUrl;
        req.flash("error", "You must be signed in!");
        res.redirect("/users/login");
    }else {
        next();
    }
};


module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have the permission to do this!");
        res.redirect(`/campgrounds/${id}`);
    }else {
        next();
    }
};


module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!req.user || !review.author.equals(req.user._id)) {
        req.flash("error", "You do not have the permission to do this!");
        res.redirect(`/campgrounds/${id}`);
    }else {
        next();
    }
};