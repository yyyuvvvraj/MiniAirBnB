const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
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
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review was deleted!");
  res.redirect(`/listings/${id}`);
};
