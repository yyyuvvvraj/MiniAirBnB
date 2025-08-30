const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{ 
        type:String,
    },
    description:String,
    image: {
    filename: { type: String, default: "listingimage" },
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/snowy-mountain-peak-peeks-through-the-clouds-LTIrGbdmCgk",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/snowy-mountain-peak-peeks-through-the-clouds-LTIrGbdmCgk"
          : v,
    }},
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports=Listing;