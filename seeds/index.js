//insert data into database
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});

const mongoose = require("mongoose");


const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");

//require the file which generates the Campground model
const Campground = require("../models/campground.js");


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


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    const number = 5;
    for(let i = 0; i < 10; i++) {
        const zeroFilled = ("00" + (i%number + 1)).slice(-3);
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random() * 20) + 10;
        const ran = cities[random1000];
        const loc = `${ran.city}, ${ran.state}`;
        const camp = new Campground({
            location: loc,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: {
                filename: `${zeroFilled}.png`,
                path:`public\\uploads\\${zeroFilled}.png`,
            },
            price: price,
            description: "Good",
            //Your user ID
            author: "61da11d6a72101e7982ae2a3",
            geometry:{
                type: "Point",
                coordinates: [
                    ran.longitude,
                    ran.latitude,
                ]
            },
        });
        await camp.save();
    }
};


seedDB().then(() => {  
    mongoose.connection.close();
});

