const express = require("express");
const router = express.Router();
const stockRequestController = require("../controllers/StockRequest");

// Rute untuk membuat entri baru submission items
router.post("/", stockRequestController.createStockRequest);

// Rute untuk mendapatkan semua data submission items
router.get("/", stockRequestController.getAllStockRequest);

// Rute untuk mendapatkan data submission items berdasarkan ID
router.get("/id/:id", stockRequestController.getStockRequestById);

// Rute untuk memperbarui data submission items berdasarkan ID
router.put("/id/:id", stockRequestController.updateStockRequestById);

// Rute untuk menghapus data submission items berdasarkan ID
router.delete("/id/:id", stockRequestController.deleteStockRequestById);

module.exports = router;
