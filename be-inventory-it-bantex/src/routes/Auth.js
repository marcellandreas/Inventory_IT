const express = require("express");

const routes = express.Router();

const usersController = require("../controllers/Auth"); // Untuk membuat Controller Users Logika
const usersValidator = require("../middleware/ValidatorSchema/UserSchema"); // Untuk Validasi data users harus sesuai tidak boleh Typo
const usersMiddleware = require("../middleware/Auth"); // untuke mencari email yang sudah digunakan
// registrasi Users Email dan Password
routes.post(
	"/users/login",
	usersValidator.userValidatorSchema,
	usersMiddleware.checkRole,
	usersController.loginUserHandler
);

module.exports = routes;
