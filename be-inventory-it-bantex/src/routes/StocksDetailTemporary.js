const express = require("express");
const router = express.Router();
const detailStockTemporaryController = require("../controllers/StocksDetailTemporary");

// Rute untuk mengambil semua data detail stok temporary
router.get("/", detailStockTemporaryController.getAllDetailStocksTemporary);

// Rute untuk menambahkan data detail stok temporary
router.post("/", detailStockTemporaryController.createDetailStockTemporary);

module.exports = router;
