const express = require("express");

const router = express.Router();
const formPengajuanController = require("../controllers/FormPengajuan");

router.get("/", formPengajuanController.getAllDataItemReq);
router.post("/req", formPengajuanController.createFormPengajuan);
router.post("/sub", formPengajuanController.PostsubmissionItems);
router.post("/surat", formPengajuanController.postSuratPengajuan);
module.exports = router;
