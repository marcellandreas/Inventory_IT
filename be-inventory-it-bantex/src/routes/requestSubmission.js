// routers/formRequestRouter.js
const express = require("express");
const reqSubController = require("../controllers/requestSubmission");

const router = express.Router();

// Rute untuk mengambil semua data form request
router.get("/", reqSubController.getAllData);
router.get("/latest", reqSubController.getDataPostDateNew);
router.get("/id/:id", reqSubController.getReqSubById);

// Rute untuk membuat form request baru
router.post("/", reqSubController.createFormRequest);

// Rute untuk mengupdate form request
router.put("/:id_item_req", reqSubController.updateFormRequest);

// Rute untuk menghapus form request
router.delete("/:id_item_req", reqSubController.deleteFormRequest);

// Rute untuk mengambil data form request berdasarkan no_pengajuan
router.get("/no_pengajuan/:no_pengajuan", reqSubController.getByNoPengajuan);

// Rute untuk mengupdate status form request
router.put("/status/:id_item_req", reqSubController.updateStatus);

// Rute untuk mengambil data form request berdasarkan status dan username
router.get(
  "/status/:status/username/:post_username",
  reqSubController.getByStatusAndUsername
);

// Rute untuk mengambil data form request berdasarkan status dan approved_1
router.get(
  "/status/:status/approved_1/:approved_1",
  reqSubController.getByStatusAndApproved1
);

// Rute untuk mengambil data form request berdasarkan status dan approved_2
router.get(
  "/status/:status/approved_2/:approved_2",
  reqSubController.getByStatusAndApproved2
);

// Rute untuk mengambil data form request berdasarkan post_username
router.get("/username/:post_username", reqSubController.getDataByPostUsername);

// Rute untuk mengambil data items request berdasarkan kriteria tertentu
router.get("/data", reqSubController.getDataByCriteria);

// Rute untuk mengubah status saat disetujui oleh approved_1 (admins)
router.put("/approve1/:idItemReq", reqSubController.approveFormRequest1);

// Rute untuk mengubah status saat disetujui oleh approved_2 (managers)
router.put("/approve2/:idItemReq", reqSubController.approveFormRequest2);

// Rute untuk mengubah status saat disetujui oleh post_username (selesai)
router.put("/finish/:idItemReq", reqSubController.finishFormRequest);

// Rute untuk menghapus tanggal approved saat status ditolak
router.put("/reject/:idItemReq", reqSubController.rejectFormRequest);

module.exports = router;
