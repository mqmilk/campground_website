const BasicJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({

    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': 'Should not contain any html tags.',
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
  });

const Joi = BasicJoi.extend(extension);

//validate schema for Campground model
module.exports.schemaCamp = Joi.object({
    title: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    description: Joi.string().required().escapeHTML(),
    deleteImages: Joi.array(),
});


//validate schema for Review model
module.exports.schemaReview = Joi.object({
    rating: Joi.number().required().min(0).max(5),
    body: Joi.string().required().escapeHTML(),
});