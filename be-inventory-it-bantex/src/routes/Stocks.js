const express = require("express");
const router = express.Router();
const stocksController = require("../controllers/Stocks");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
// Rute untuk mengambil semua data stocks
router.get("/", stocksController.getAllStocks);

// Rute untuk mengambil data stock berdasarkan ID
router.get("/id/:id", stocksController.getStockById);

// Rute untuk mengambil data stock berdasarkan ID
router.get("/stock/:stockNo", stocksController.getStockByStockNo);

// Rute untuk membuat stock baru
router.post("/", stocksController.createStock);

// Rute untuk mengupdate stock berdasarkan Stock No
router.put("/:stock_no", stocksController.updateStock);

// Rute untuk menghapus stock berdasarkan ID
router.delete("/:id", stocksController.deleteStock);

// Mendapatkan stock_qty berdasarkan stock_no
router.get("/:stockNo/stock_qty", stocksController.getStockQty);

// Memperbarui stock_qty berdasarkan stock_no
router.put("/:stockNo/stock_qty", stocksController.updateStockQty);

// rute untuk mengabil data stock no saja
router.get("/no", stocksController.getUniqueStockNo);

module.exports = router;
