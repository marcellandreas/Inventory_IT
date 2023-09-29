const { hashSync, genSalt, compare } = require("bcrypt");
const BadRequestError = require("../exceptions/badRequestError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const NotFoundError = require("../exceptions/notFoundError");
const pool = require('../config/database');


exports.getRole = async (username, password) => {
	const SQLQuery = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
	const results = await pool.execute(SQLQuery);
	return results[0]
};

exports.verifyUsers = async (users) => {
	const { role, password } = users;
	console.log(role)
	console.log(password)

	const SQLQuery = `SELECT * FROM user WHERE role = '${role}'`;

	const results = await pool.execute(SQLQuery);
	
	if (!results[0].length > 0) {
		throw new AuthenticationError(
			"username atau pass salah atau tidak di temukan",
		);
	}


	return results[0][0]
};

exports.getAllUser