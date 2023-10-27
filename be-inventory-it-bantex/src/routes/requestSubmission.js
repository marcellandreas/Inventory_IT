// routers/formRequestRouter.js
const express = require("express");
const requestSubmissionController = require("../controllers/requestSubmission");

const router = express.Router();

// Rute untuk mengambil semua data form request
router.get("/", requestSubmissionController.getAllData);
router.get("/id/:id", requestSubmissionController.getReqSubById);

// Rute untuk membuat form request baru
router.post("/", requestSubmissionController.createFormRequest);

// Rute untuk mengupdate form request
router.put("/:id_item_req", requestSubmissionController.updateFormRequest);

// Rute untuk menghapus form request
router.delete("/:id_item_req", requestSubmissionController.deleteFormRequest);

// Rute untuk mengambil data form request berdasarkan no_pengajuan
router.get(
  "/no_pengajuan/:no_pengajuan",
  requestSubmissionController.getByNoPengajuan
);

// Rute untuk mengupdate status form request
router.put("/status/:id_item_req", requestSubmissionController.updateStatus);

// Rute untuk mengambil data form request berdasarkan status dan username
router.get(
  "/status/:status/username/:post_username",
  requestSubmissionController.getByStatusAndUsername
);

// Rute untuk mengambil data form request berdasarkan status dan approved_1
router.get(
  "/status/:status/approved_1/:approved_1",
  requestSubmissionController.getByStatusAndApproved1
);

// Rute untuk mengambil data form request berdasarkan status dan approved_2
router.get(
  "/status/:status/approved_2/:approved_2",
  requestSubmissionController.getByStatusAndApproved2
);

// Rute untuk mengambil data form request berdasarkan post_username
router.get(
  "/username/:post_username",
  requestSubmissionController.getDataByPostUsername
);

// Rute untuk mengambil data items request berdasarkan kriteria tertentu
router.get("/data", requestSubmissionController.getDataByCriteria);

// Rute untuk mengubah status saat disetujui oleh approved_1 (admins)
router.put(
  "/approve1/:idItemReq",
  requestSubmissionController.approveFormRequest1
);

// Rute untuk mengubah status saat disetujui oleh approved_2 (managers)
router.put(
  "/approve2/:idItemReq",
  requestSubmissionController.approveFormRequest2
);

// Rute untuk mengubah status saat disetujui oleh post_username (selesai)
router.put("/finish/:idItemReq", requestSubmissionController.finishFormRequest);

// Rute untuk menghapus tanggal approved saat status ditolak
router.put("/reject/:idItemReq", requestSubmissionController.rejectFormRequest);

module.exports = router;
