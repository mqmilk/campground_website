//require the file which generates the Campground model
const Campground = require("../models/campground.js");
const Review = require("../models/review.js");

module.exports.renderNewReview = (req, res) => {
    const {id} = req.params;
    res.render("campgrounds/reviewNew.ejs", {id});
};

module.exports.createReview = async(req, res, next) => {
    const {id} = req.params;
    const {rating, body} = req.body;
    const campground = await Campground.findById(id);
    const review = new Review({rating, body});
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created a New Review.");
    res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res, next) => {
    const {id, reviewId} = req.params;
    //delete the reviewId in the Campground  model
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted a review.");
    res.redirect(`/campgrounds/${id}`);
};


module.exports.renderAll = (req, res) => {
    const {id} = req.params;
    res.redirect(`/campgrounds/${id}`);
};