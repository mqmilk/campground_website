const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review.js");

const opts = {toJSON: {virtuals:true}}

const campgroundSchema = new Schema({
    title: String,
    price: Number,
    location: String,
    description: String,
    image: [{
        filename: String,
        path: String,
    }],
    geometry: {
        type: {
          type: String, 
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        }
      },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
}, opts);

campgroundSchema.virtual("properties.popUpMarkup").get(function(){
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`;
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