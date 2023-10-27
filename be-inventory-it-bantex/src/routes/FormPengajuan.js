const express = require("express");

const router = express.Router();
const formPengajuanController = require("../controllers/FormPengajuan");

router.get("/", formPengajuanController.getAllDataItemReq);

router.get("/req", formPengajuanController.getAllDataReqSubandStockRequest);
router.get(
  "/req/:id_item_req",
  formPengajuanController.getAllDataReqSubandStockRequestById
);

// Post Items Request
router.post("/req", formPengajuanController.createItemRequest);

router.get("/req/:username", formPengajuanController.getDataItemReqByUsername);
router.post("/sub", formPengajuanController.PostsubmissionItems);

// stock submission
router.get("/sub", formPengajuanController.getAllDataReqSubandStockSubmission);
router.get(
  "/sub/:id_stock_sub",
  formPengajuanController.getAllDataReqSubandStockSubmissionById
);

module.exports = router;
