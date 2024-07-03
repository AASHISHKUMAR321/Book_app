const express = require("express");
const connectToDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const auth = require("./middlewares/auth");
require("dotenv").config();

const port = process.env.PORT || 9090;
const db_url = process.env.DB_URI;

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("this is a home route");
});
app.use("/user", userRouter);
app.use("/books", auth, bookRouter);


app.listen(port, async () => {
  try {
    await connectToDB(db_url);
    console.log("connect to database");
    console.log(`server is running at ${port}`);
  } catch (err) {
    console.log(err);
  }
});