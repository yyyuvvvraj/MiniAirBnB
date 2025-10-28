const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

// New Route
router.get("/new", isLoggedIn,(req, res) => {
    res.render("listings/new");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/show", { listing });
}));

// Create Route
router.post("/", validateListing, wrapAsync(async (req, res) => {
    const listingData = req.body.listing;

    // Convert image string to object if necessary
    if (typeof listingData.image === "string") {
        listingData.image = { url: listingData.image };
    }
    // If image is missing, set to empty object to use mongoose defaults
    if (!listingData.image) {
        listingData.image = {};
    }

    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
}));

// Edit Route
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/edit", { listing });
}));

// Update Route
router.put("/:id",isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    let updatedListing = req.body.listing;

    // Preserve filename if missing on update
    if (updatedListing.image && !updatedListing.image.filename) {
        updatedListing.image.filename = listing.image.filename;
    }

    await Listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id", isLoggedIn,wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing was deleted!");
    res.redirect("/listings");
}));

module.exports = router;
