const express = require("express");
const router = express.Router();
const submissionItemsController = require("../controllers/submissionItems");

// Rute untuk membuat entri baru submission items
router.post("/", submissionItemsController.createSubmissionItems);

// Rute untuk mendapatkan semua data submission items
router.get("/", submissionItemsController.getAllSubmissionItems);

// Rute untuk mendapatkan data submission items berdasarkan ID
router.get("/id/:id", submissionItemsController.getSubmissionItemsById);

// Rute untuk memperbarui data submission items berdasarkan ID
router.put("/id/:id", submissionItemsController.updateSubmissionItemsById);

// Rute untuk menghapus data submission items berdasarkan ID
router.delete("/id/:id", submissionItemsController.deleteSubmissionItemsById);

module.exports = router;
