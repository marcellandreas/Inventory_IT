const express = require("express");
const router = express.Router();
const stockTemp = require("../controllers/StocksTemporary");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
// Rute untuk mengambil semua data stok temporary
router.get("/", stockTemp.getAllStocksTemporary);

// Rute untuk menambahkan data stok temporary
router.post("/", stockTemp.addStockTemporary);

module.exports = router;
