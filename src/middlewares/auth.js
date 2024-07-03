var jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const header = req.headers.authorization;


  if (!header) {
    return res.status(400).json({
      message: "token  is not present or token is not provided",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  //here we have to check if this particular token is blacklisted or not.
  // const blacklistToken = await blacklistModel.findOne({ token });
  // if (blacklistToken) {
  //   return res.status(400).json({
  //     message: "this token is blacklisted try to get the new token",
  //   });
  // }
  jwt.verify(token, "masai", function (err, decoded) {
    // console.log(decoded) // bar
    if (err) {
      return res.status(400).json({ message: "this is not a valid token" });
    } else {
      req.user = decoded;
      next();
    }
  });

  // we have to get the token
  // const token =
};

module.exports = auth;
