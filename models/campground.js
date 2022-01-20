const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review.js");

const campgroundSchema = new Schema({
    title: String,
    image: [{
        filename: String,
        path: String,

    }],
    price: Number,
    location: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});


//delete related data after delete the original campground
campgroundSchema.post("findOneAndDelete", async function(campground) {
    if(campground.reviews.length) {
        const res = await Review.deleteMany({_id: {$in: campground.reviews}});
        //console.log(res);
    }
});


//model: Campground, collections: campgrounds
const Campground = new mongoose.model("Campground", campgroundSchema);
module.exports = Campground;