const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({dest: "./public/uploads/"}); 


//require the file which controller
const campgrounds = require("../controllers/campgrounds.js");


//utilities
const catchAsync = require("../utilities/catchAsync");
const {validateCampground, isLoggedIn, isAuthor} = require("../utilities/validate");

//all campground page
router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.create))
    
//create a new campground page
router.get("/new", isLoggedIn, campgrounds.renderNewCamp);



//show specific campground page
router.route("/:id")
    .get(catchAsync(campgrounds.showCamp))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.edit))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete))


//edit a campground page
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditCamp));





module.exports = router;