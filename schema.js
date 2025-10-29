// schema.js
const Joi = require("joi");

// Listing schema expects the nested "listing" object (unchanged)
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      filename: Joi.string().optional(),
      url: Joi.string().uri().allow("").optional()
    }).optional().default({})
  }).required()
});

// Review schema expects a flat object: { rating, comment }
// validateReview middleware will pass req.body.review or req.body
module.exports.reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required()
    .messages({
      "any.required": "rating is required",
      "number.base": "rating must be a number between 1 and 5",
      "number.min": "rating must be at least 1",
      "number.max": "rating must be at most 5"
    }),
  comment: Joi.string().trim().min(1).required()
    .messages({
      "any.required": "comment is required",
      "string.empty": "comment is required"
    })
});
