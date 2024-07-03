const { Router } = require("express");
const role = require("../middlewares/role");
const reviewModel = require("../models/reviewsModel");
const reviewRouter = Router();

// get all the books

// who can access this route.
//user and admin
reviewRouter.get("/", async (req, res) => {
  try {
    const books = await reviewModel.find();
    res.json({ books: books });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

//get a singe book
reviewRouter.get("/:id", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// creating a single book

// who can create the books
reviewRouter.post("/", role(["admin"]), async (req, res) => {
  try {
    const { title, genre, author, price } = req.body;

    const book = new reviewModel({ title, genre, author, price });
    await book.save();
    res.status(201).json({ message: "book is created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// update a single book
reviewRouter.patch("/:id",role(["admin"]), async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// delete a single book
reviewRouter.delete("/:id",role(["admin"]), async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = reviewRouter;
