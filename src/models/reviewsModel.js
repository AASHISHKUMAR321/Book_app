const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "books", required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
});

const reviewModel = model("reviews", reviewSchema);

module.exports = reviewModel;

//roles -> user , admin, librarain , guest
// user is logged in but is not an admin

//each review
//-> who is giving the review
//-> whe should know the book
//->
