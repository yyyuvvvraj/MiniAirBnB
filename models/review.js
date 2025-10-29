const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // 👈 this line is the key
  }
}, { timestamps: true }); // optional, gives createdAt/updatedAt

module.exports = mongoose.model("Review", reviewSchema);
