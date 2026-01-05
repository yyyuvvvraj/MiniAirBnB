const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res) => {
  const listingData = req.body.listing || {};
  let url = req.file.path;
  let filename = req.file.filename;

  if (typeof listingData.image === "string") {
    listingData.image = { url: listingData.image };
  }
  if (!listingData.image) {
    listingData.image = {};
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();

  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");

  let updatedListing = req.body.listing || {};

  if (updatedListing.image && !updatedListing.image.filename) {
    updatedListing.image.filename = listing.image.filename;
  }

  await Listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing was deleted!");
  res.redirect("/listings");
};
