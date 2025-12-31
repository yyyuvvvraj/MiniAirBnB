// routes/review.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { isLoggedIn, validateReview , isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// POST /listings/:id/reviews  -> create a review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE /listings/:id/reviews/:reviewId  -> delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
