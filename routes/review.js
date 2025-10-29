// routes/review.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { isLoggedIn, validateReview , isReviewAuthor } = require("../middleware.js");

// POST /listings/:id/reviews  -> create a review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    // req.body.review should have { rating, comment }
    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();

    listing.reviews.push(review._id);
    await listing.save();

    req.flash("success", "Successfully created a new review!");
    res.redirect(`/listings/${id}`);
  })
);

// DELETE /listings/:id/reviews/:reviewId  -> delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,isReviewAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review was deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
