// routers/formRequestRouter.js
const express = require("express");
const formRequestController = require("../controllers/ItemsRequest");

const router = express.Router();

// Rute untuk mengambil semua data form request
router.get("/", formRequestController.getAllData);

// Rute untuk membuat form request baru
router.post("/", formRequestController.createFormRequest);

// Rute untuk mengupdate form request
router.put("/:id_item_req", formRequestController.updateFormRequest);

// Rute untuk menghapus form request
router.delete("/:id_item_req", formRequestController.deleteFormRequest);

// Rute untuk mengambil data form request berdasarkan no_pengajuan
router.get(
  "/no_pengajuan/:no_pengajuan",
  formRequestController.getByNoPengajuan
);

// Rute untuk mengupdate status form request
router.put("/status/:id_item_req", formRequestController.updateStatus);

// Rute untuk mengambil data form request berdasarkan status dan username
router.get(
  "/status/:status/username/:post_username",
  formRequestController.getByStatusAndUsername
);

// Rute untuk mengambil data form request berdasarkan status dan approved_1
router.get(
  "/status/:status/approved_1/:approved_1",
  formRequestController.getByStatusAndApproved1
);

// Rute untuk mengambil data form request berdasarkan status dan approved_2
router.get(
  "/status/:status/approved_2/:approved_2",
  formRequestController.getByStatusAndApproved2
);

// Rute untuk mengambil data form request berdasarkan post_username
router.get(
  "/username/:post_username",
  formRequestController.getDataByPostUsername
);

// Rute untuk mengambil data items request berdasarkan kriteria tertentu
router.get("/data", formRequestController.getDataByCriteria);

// Rute untuk mengubah status saat disetujui oleh approved_1
router.put("/approve1/:idItemReq", formRequestController.approveFormRequest1);

// Rute untuk mengubah status saat disetujui oleh approved_2
router.put("/approve2/:idItemReq", formRequestController.approveFormRequest2);

// Rute untuk mengubah status saat disetujui oleh post_username (selesai)
router.put("/finish/:idItemReq", formRequestController.finishFormRequest);

// Rute untuk menghapus tanggal approved saat status ditolak
router.put("/reject/:idItemReq", formRequestController.rejectFormRequest);

module.exports = router;
