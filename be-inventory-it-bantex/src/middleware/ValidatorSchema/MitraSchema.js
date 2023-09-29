/* eslint-disable consistent-return */
const Joi = require("@hapi/joi");
const path = require("path");
const fs = require("fs");

const folder = path.join(process.cwd(), "/public/ktp-image");
const { badRequestError } = require("../../exceptions/handler/responseHandler");

exports.mitraValidatorSchema = (req, res, next) => {
	const schemaValidator = Joi.object({
		nama_mitra: Joi.string(),
		userId: Joi.string(),
		alamat: Joi.string(),
		telepon: Joi.string(),
		email: Joi.string().email(),
		nama_personal: Joi.string(),
		alamat_personal: Joi.string(),
		telepon_personal: Joi.string(),
		email_personal: Joi.string(),
		verify: Joi.string(),
	});

	const validationResult = schemaValidator.validate(req.body);

	if (validationResult.error) {
		return badRequestError(validationResult.error.message, res);
	}
	next();
};

exports.mitraVerifcationSchema = (req, res, next) => {
	const schemaValidator = Joi.object({
		npwp: Joi.string().empty(""),
		nama_usaha: Joi.string().empty(""),
		ktp: Joi.string().required(),
		userId: Joi.string(),
	});

	const validationResult = schemaValidator.validate(req.body);

	if (validationResult.error) {
		try {
			fs.unlinkSync(`${folder}/\\${req.body.ktp}`);
		} catch (err) {
			console.log(err);
		}
		return badRequestError(validationResult.error.message, res);
	}
	next();
};
