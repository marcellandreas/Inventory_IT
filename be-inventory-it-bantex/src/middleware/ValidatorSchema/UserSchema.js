/* eslint-disable consistent-return */
const Joi = require("@hapi/joi");
const { badRequestError } = require("../../exceptions/handler/responseHandler");

exports.userValidatorSchema = (req, res, next) => {
	const validatorPayloadSchema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
	});


	const validateResult = validatorPayloadSchema.validate(req.body);

	if (validateResult.error) {
		return badRequestError(validateResult.error.message, res);
	}
	req.body = validateResult.value;
	next();
};
