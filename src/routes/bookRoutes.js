const { Router } = require("express");
const bookModel = require("../models/bookModel");
const role = require("../middlewares/role");
const reviewModel = require("../models/reviewsModel");
const userModel = require("../models/userModel");

const bookRouter = Router();

// get all the books

bookRouter.get("/review", async (req, res) => {
  console.log('review route')
  try {
    const allReviews = await reviewModel.find().populate(['userId','bookId']);
    res.json({ reviews: allReviews });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});


// who can access this route.
//user and admin
bookRouter.get("/", async (req, res) => {
  try {
    const books = await bookModel.find();
    res.json({ books: books });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

//get a singe book
bookRouter.get("/:id", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// creating a single book

// who can create the books
bookRouter.post("/", role(["admin"]), async (req, res) => {
  try {
    const { title, genre, author, price } = req.body;

    const book = new bookModel({ title, genre, author, price });
    await book.save();
    res.status(201).json({ message: "book is created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

bookRouter.post("/:id/review", role(["admin"]), async (req, res) => {
  try {
    const { feedback, rating } = req.body;

    const user = await userModel.findOne({ email: req.user.email });
    console.log(user);

    const review = new reviewModel({
      feedback,
      rating,
      userId: user._id,
      bookId: req.params.id,
    });
    await review.save();
    res.status(201).json({ message: "review is added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});



// update a single book
bookRouter.patch("/:id", role(["admin"]), async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// delete a single book
bookRouter.delete("/:id", role(["admin"]), async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = bookRouter;
