// middleware.js
const Listing = require("./models/listing");
const Review = require("./models/review"); // needed for isReviewAuthor
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// Auth check
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that.");
    return res.redirect("/login");
  }
  next();
};

// Save redirectUrl to locals (optional)
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Listing owner check
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  // Use req.user if available, otherwise fallback to res.locals.currUser
  const currentUserId = (req.user && req.user._id) || (res.locals.currUser && res.locals.currUser._id);
  if (!currentUserId || !listing.owner.equals(currentUserId)) {
    req.flash("error", "You are not the owner of this listing.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Validate listing payload (keeps using nested req.body.listing)
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Validate review payload — robust and normalizes the input
module.exports.validateReview = (req, res, next) => {
  // Accept nested or flat payload
  const payload = req.body && req.body.review ? { ...req.body.review } : { ...req.body };

  // Convert rating from string -> number if present
  if (typeof payload.rating !== "undefined" && payload.rating !== "") {
    payload.rating = Number(payload.rating);
    // If conversion fails (NaN), clear it so Joi reports required/number error
    if (Number.isNaN(payload.rating)) payload.rating = undefined;
  } else {
    // ensure empty string becomes undefined to trigger required validation
    payload.rating = undefined;
  }

  const { error } = reviewSchema.validate(payload);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }

  // write normalized payload back so downstream code gets a numeric rating
  if (req.body && req.body.review) req.body.review = payload;
  else req.body = payload;

  next();
};

// Check if current user is the review's author
module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }
  const currentUserId = (req.user && req.user._id) || (res.locals.currUser && res.locals.currUser._id);
  if (!currentUserId || !review.author.equals(currentUserId)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
