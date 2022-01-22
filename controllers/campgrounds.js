const fs = require('fs');

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});


//require the file which generates the Campground model
const Campground = require("../models/campground.js");

module.exports.index = async(req, res) => {
    const campgrounds = await Campground.find({})
    .populate("reviews");
    res.render("campgrounds/index.ejs", {campgrounds});
};

module.exports.renderNewCamp = (req, res) => {
    //res.send("NEW!!!");
    res.render("campgrounds/new.ejs");
};

module.exports.create = async (req, res) => {
    //even if client site give validation on input, postman can still input empty post
    //if(!Object.keys(req.body).length) throw new ExpressError(400, "Invalid Input Campground Data");
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1,
      }).send();
    const campground = new Campground(req.body);
    campground.geometry = geoData.body.features[0].geometry;
    campground.image = req.files.map(f => ({filename: f.filename,
        path: f.path}));
    campground.author = req.user._id;
    await campground.save();
    //console.log(campground);
    req.flash("success", "Successfully made a new campground.")
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCamp = async (req, res, next) => {
    //res.send("HEEE");
    const {id} = req.params;
    //console.log(id);
    const campground = await Campground.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("author");
    if(!campground) {
        req.flash("error", "Cannot find that campground");
        return res.redirect(`/campgrounds`);
    }
    res.render("campgrounds/show.ejs", {campground});
};

module.exports.renderEditCamp = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground) {
        req.flash("error", "Cannot find that campground");
        return res.redirect(`/campgrounds`);
    }
    res.render("campgrounds/edit.ejs", {campground});
};

module.exports.edit = async (req, res, next) => {
    const {id} = req.params;
    //if(!Object.keys(req.body).length) throw new ExpressError(400, "Invalid Input Campground Data");
    //console.log(req.body.deleteImages);
    const campground = await Campground.findByIdAndUpdate(id, req.body, {new: true});
    const imgs = req.files.map(f => ({filename: f.filename, path: f.path}));
    campground.image.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        //delete the uploaded images in the backend
        for(let filename of req.body.deleteImages){
            const path = `public/uploads/${ filename }`;
            fs.unlinkSync(path);
        }
        //delete the images stored in mongoose
        await campground.updateOne({$pull:{image:{filename:{$in:req.body.deleteImages}}}});
    }
    req.flash("success", "Successfully updated campground");
    res.redirect(`/campgrounds/${id}`);
};

module.exports.delete = async (req, res, next) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    //console.log(id);
    req.flash("success", "Successfully deleted a campground.");
    res.redirect(`/campgrounds`);
};