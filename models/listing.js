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
    "https://vumo.co.uk/wp-content/uploads/2022/11/getty-images-kZat9Gzg5Uk-unsplash.jpg",
  set: (v) =>
    v === ""
      ? "https://vumo.co.uk/wp-content/uploads/2022/11/getty-images-kZat9Gzg5Uk-unsplash.jpg"
      : v,
}},
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports=Listing;