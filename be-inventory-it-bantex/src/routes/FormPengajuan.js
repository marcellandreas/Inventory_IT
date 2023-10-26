const express = require("express");

const router = express.Router();
const formPengajuanController = require("../controllers/FormPengajuan");

router.get("/", formPengajuanController.getAllDataItemReq);
router.get("/form", formPengajuanController.getAllDataPengajuan);
router.get(
  "/form/:id_item_req",
  formPengajuanController.getDataPengajuanByIdForm
);

// Post Items Request
router.post("/req", formPengajuanController.createItemRequest);

router.get("/req/:username", formPengajuanController.getDataItemReqByUsername);
router.post("/sub", formPengajuanController.PostsubmissionItems);
module.exports = router;
