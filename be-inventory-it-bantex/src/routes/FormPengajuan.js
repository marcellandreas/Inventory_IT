const express = require("express");

const router = express.Router();
const formPengajuanController = require("../controllers/FormPengajuan");

router.get("/", formPengajuanController.getAllDataItemReq);
router.get("/form", formPengajuanController.getAllDataPengajuan);
router.get(
  "/form/:id_item_req",
  formPengajuanController.getDataPengajuanByIdForm
);

router.post("/req", formPengajuanController.createFormPengajuan);
router.get("/req/:username", formPengajuanController.getDataItemReqByUsername);
router.post("/sub", formPengajuanController.PostsubmissionItems);
router.post("/surat", formPengajuanController.postSuratPengajuan);
router.delete("/surat", formPengajuanController.deleteFormReqItems);
module.exports = router;
