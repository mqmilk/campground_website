const Joi = require("joi");

//validate schema for Campground model
module.exports.schemaCamp = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    deleteImages: Joi.array(),
});


//validate schema for Review model
module.exports.schemaReview = Joi.object({
    rating: Joi.number().required().min(0).max(5),
    body: Joi.string().required(),
});