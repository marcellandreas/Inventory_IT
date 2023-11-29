const express = require("express");

const router = express.Router();
const pengajuan = require("../controllers/FormPengajuan");

router.get("/", pengajuan.getAllDataItemReq);

// request
router.get("/req", pengajuan.getAllDataReqSubandStockRequest);
router.get("/status-req", pengajuan.getAllDataReqSubandStockRequestByStatus);
router.get("/req/:id_item_req", pengajuan.getAllDataReqSubandStockRequestById);
router.get("/req/:username", pengajuan.getDataItemReqByUsername);

// submission
router.get("/sub", pengajuan.getAllDataReqSubandStockSubmission);
router.get("/status-sub", pengajuan.getAllDataReqSubandStockSubmissionByStatus);
router.get(
  "/sub/:id_stock_sub",
  pengajuan.getAllDataReqSubandStockSubmissionById
);

module.exports = router;
