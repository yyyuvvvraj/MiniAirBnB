const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");

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
router.get("/new", (req, res) => {
    res.render("listings/new");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
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
    await newListing.save();
    res.redirect("/listings");
}));

// Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/edit", { listing });
}));

// Update Route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    let updatedListing = req.body.listing;

    // Preserve filename if missing on update
    if (updatedListing.image && !updatedListing.image.filename) {
        updatedListing.image.filename = listing.image.filename;
    }

    await Listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;
