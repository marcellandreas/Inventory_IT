/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("@hapi/joi");
const { badRequestError } = require("../../exceptions/handler/responseHandler");

exports.addUserValidatorSchema = (req, res, next) => {
	const schemaValidator = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().email().required().min(5),
		password: Joi.string().min(4).required(),
	});

	const validatorResult = schemaValidator.validate(req.body);

	if (validatorResult.error) {
		return badRequestError(validatorResult.error.message, res);
	}
	next();
};

exports.loginValidatorSchema = (req, res, next) => {
	const schemaValidator = Joi.object({
		email: Joi.string().email().required().min(5),
		password: Joi.string().min(4).required(),
	});

	const validatorResult = schemaValidator.validate(req.body);

	if (validatorResult.error) {
		return badRequestError(validatorResult.error.message, res);
	}
	next();
};
