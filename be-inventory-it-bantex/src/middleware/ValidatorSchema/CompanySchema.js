/* eslint-disable consistent-return */
const Joi = require("@hapi/joi");
const { badRequestError } = require("../../exceptions/handler/responseHandler");

exports.companyValidatorSchema = (req, res, next) => {
	const validatorPayloadSchema = Joi.object({
		nama_usaha: Joi.string().required(),
		nama_kategori: Joi.string().required(),
        deskripsi_usaha: Joi.string().required(),
        lokasi_usaha: Joi.string().required(),
        image_usaha: Joi.string().empty(""),
        alamat_usaha: Joi.string().required(),
        userId: Joi.string().required()
	});

	const validateResult = validatorPayloadSchema.validate(req.body);

	if (validateResult.error) {
		return badRequestError(validateResult.error.message, res);
	}
	req.body = validateResult.value;
	next();
};
