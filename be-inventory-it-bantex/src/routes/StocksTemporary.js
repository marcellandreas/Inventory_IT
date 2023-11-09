const express = require("express");
const router = express.Router();
const stockTemporaryController = require("../controllers/StocksTemporary");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
// Rute untuk mengambil semua data stok temporary
router.get("/", stockTemporaryController.getAllStocksTemporary);

// Rute untuk menambahkan data stok temporary
router.post("/", stockTemporaryController.addStockTemporary);

module.exports = router;
