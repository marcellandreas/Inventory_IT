const express = require("express");
const router = express.Router();
const submissionItemsController = require("../controllers/submissionItems");

// Rute untuk membuat entri baru submission items
router.post("/", submissionItemsController.createSubmissionItems);

// Rute untuk mendapatkan semua data submission items
router.get("/", submissionItemsController.getAllSubmissionItems);

// Rute untuk mendapatkan data submission items berdasarkan ID
router.get("/id/:id", submissionItemsController.getSubmissionItemsById);

// Rute untuk mendapatkan data submission items berdasarkan sub_no
router.get(
  "/sub_no/:sub_no",
  submissionItemsController.getSubmissionItemsBySubNo
);

// Rute untuk memperbarui data submission items berdasarkan ID
router.put("/id/:id", submissionItemsController.updateSubmissionItemsById);

// Rute untuk memperbarui data submission items berdasarkan sub_no
router.put(
  "/sub_no/:sub_no",
  submissionItemsController.updateSubmissionItemsBySubNo
);

// Rute untuk menghapus data submission items berdasarkan ID
router.delete("/:id", submissionItemsController.deleteSubmissionItemsById);

module.exports = router;
