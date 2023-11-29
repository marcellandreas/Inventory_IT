const CreatePengajuanModel = require("../models/CreatePengajuan");
const pool = require("../config/database");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const pengajuan = new CreatePengajuanModel(dbConfig);

const sendErrorRes = (res, statusCode, message, error) => {
  res
    .status(statusCode)
    .json({ success: false, message, error: error.message });
};

const sendSuccessRes = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message, data });
};

exports.createPengajuan = (req, res) => {
  const { body } = req;
  pengajuan.createPengajuan(...Object.values(body), (error, no_pengajuan) => {
    if (error) {
      console.log(error);
      sendErrorRes(res, 500, "pengajuan gagal dibuat", error);
    } else {
      const data = { no_pengajuan, ...body };
      sendSuccessRes(res, 201, "pengajuan berhasil dibuat", data);
    }
  });
};
