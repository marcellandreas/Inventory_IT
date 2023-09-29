/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const fs = require("fs");
const path = require("path");

const folder = path.join(process.cwd(), "/public/img-events");
const Joi = require("@hapi/joi");
const { badRequestError } = require("../../exceptions/handler/responseHandler");

exports.eventsValidatorSchema = (req, res, next) => {
	const validatorPayloadSchema = Joi.object({
		nama_event: Joi.string().required(),
		kategori: Joi.string().required(),
		link_pendaftaran: Joi.string().required(),
		deskripsi: Joi.string().required(),
		lokasi_kota: Joi.string().required(),
		image_event: Joi.string().empty(""),
		alamat: Joi.string().required(),
		tanggal_mulai: Joi.string().required(),
		tanggal_akhir: Joi.string().required(),
		userId: Joi.string().required(),
	});

	const validateResult = validatorPayloadSchema.validate(req.body);

	if (validateResult.error) {
		try {
			fs.unlinkSync(`${folder}/\\${req.body.image_event}`);
		} catch (err) {
			console.log(err);
		}
		return badRequestError(validateResult.error.message, res);
	}
	req.body.events = validateResult.value;
	next();
};
