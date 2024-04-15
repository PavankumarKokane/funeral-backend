var jwt = require("jsonwebtoken");

// @middleware   GET api/v1/middleware/fetchUser

const fetchUser = (req, res, next) => {
  // get the token from the header
  const token = req.header("x-auth-token");

  //console.log("token: ", token);

  // if there is no token, return an error
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ message: "No token, authorization denied" }] });
  }

  // if there is a token, verify it

  try {
    // verify the token
    const data = jwt.verify(token, "1lo4eumiui");

    //console.log("decoded: ", data);

    req.user = data._id;

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ message: "Invalid token" }] });
  }

  next();

};

module.exports = fetchUser;
