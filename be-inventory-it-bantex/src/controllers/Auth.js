/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const userModels = require("../models/Auth");

const {
  serverError,
  authenticationError,
} = require("../exceptions/handler/responseHandler");
const AuthenticationError = require("../exceptions/AuthenticationError");

/* eslint-disable no-unused-vars */

exports.loginUserHandler = async (req, res, next) => {
  try {
    const user = await userModels.verifyUsers(req.body[0]);

    const token = jwt.sign(
      { id: user.id_user, username: user.username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({
      status: "success",
      message: "Anda berhasil Login",
      data: {
        role: user.role,
        id_user: user.id_user,
        username: user.username,
        accessToken: token,
      },
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return authenticationError(error.message, res);
    }
    return serverError("maaf terjadi kesalahan pada server kami", res);
  }
};
