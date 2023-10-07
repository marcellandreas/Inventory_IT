/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
const {
  authenticationError,
  serverError,
} = require("../exceptions/handler/responseHandler");

exports.verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return authenticationError("Not Authentication", res);
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return authenticationError("Not Authentication silahkan login", res);
  }

  if (!decoded) {
    return authenticationError("Not Authentication", res);
  }
  req.body.userId = decoded.id;
  next();
};
