const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title: String,
    description: String,
    image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://vumo.co.uk/wp-content/uploads/2022/11/getty-images-kZat9Gzg5Uk-unsplash.jpg",
            set: (v) => v === "" ?
                "https://vumo.co.uk/wp-content/uploads/2022/11/getty-images-kZat9Gzg5Uk-unsplash.jpg" : v,
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
