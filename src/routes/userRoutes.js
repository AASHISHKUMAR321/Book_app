const { Router } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require('dotenv').config();
// const blacklistModel = require("../models/blacklistModel");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    // body validation
    if (!email || !password || !userName) {
      return res
        .status(400)
        .json({ message: "this is not valid body check your fields" });
    }

    //Step-1

    // before createing the user we have to if that perticular user is already present or not.

    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "this email is already registered try to login" });
    }

    //Step-2

    const hashedPassword = bcrypt.hash(password, 12, async (err, result) => {
      if (err) console.log(err);
      else {
        const user = new userModel({ email, userName, password: result });
        await user.save();
        return res
          .status(201)
          .json({ message: "user is registered successfully" });
      }
    });
    // const user = new userModel({email,userName,password})
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // to validate the body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "this is not valid body check your fields" });
    }

    // what the next step
    // we have to check with this email user is present or not.

    const exists = await userModel.findOne({ email: email });
    if (!exists) {
      return res
        .status(400)
        .json({ message: "this email is not registered try to register" });
    }
    // next step is to match the password
    // password from the body
    // password from the database

    bcrypt.compare(password, exists.password, (err, result) => {
      if (err) console.log(err);
      else {
        if (result) {
          //we have to do somthing
          // token -> string , jwt-> json web token

          // you have to genraet 2 tokens
          //token-1   - accessToken -> less expire  5 mins
          //token-1 - refresh token -> hight expreis than accessToken
          jwt.sign(
            {
              email: exists.email,
              userName: exists.userName,
              role: exists.role,
            
            },
            process.env.JWT_SECRET,
            (err, token) => {
              if (err) console.log(err);
              else {
                req.session.token = token;
                console.log(req.session);
                return res.status(200).json({ accessToken: token });
              }
            }
            // { expiresIn: '1m' }
          );
        } else {
          // password are not matched

          return res.status(400).json({
            message: "user details are not correct check your details",
          });
        }
      }
    });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

// userRouter.post("/logout", async (req, res) => {
//   const token = req.session.token;
//   console.log(token)
//   if (!token) {
//     return res.status(400).json({
//       message: " token is not provided",
//     });
//   }

//   //access the token
//   // store this token into tokenblaclist collection
//   try {
//     const newtoken = new blacklistModel({ token });
//     await newtoken.save();
//     res.status(201).json({ message: "user is logged out successfully" });

//     //what will heppend once use logged out that particular token is not valid
//   } catch (err) {
//     console.log(err)
//   }
// });

module.exports = userRouter;
