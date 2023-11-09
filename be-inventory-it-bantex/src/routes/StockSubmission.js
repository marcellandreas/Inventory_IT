const express = require("express");
const router = express.Router();
const stockSubmissionController = require("../controllers/StockSubmission");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
// Rute untuk membuat entri baru submission items
router.post("/", stockSubmissionController.createStockSubmission);

// Rute untuk mendapatkan semua data submission items
router.get("/", stockSubmissionController.getAllStockSubmission);

// Rute untuk mendapatkan data submission items berdasarkan ID
router.get("/id/:id", stockSubmissionController.getStockSubmissionById);

// Rute untuk memperbarui data submission items berdasarkan ID
router.put("/id/:id", stockSubmissionController.updateStockSubmissionById);

// Rute untuk menghapus data submission items berdasarkan ID
router.delete("/id/:id", stockSubmissionController.deleteStockSubmissionById);

module.exports = router;
