const express = require("express");
const router = express.Router({mergeParams: true});

const reviews = require("../controllers/reviews.js");

//error utilities
const catchAsync = require("../utilities/catchAsync");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../utilities/validate");

//leave a review
router.route("/")
    .get(isLoggedIn, reviews.renderNewReview)
    .post(isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));


router.get("*", reviews.renderAll);

module.exports = router;