const express = require("express");
const router = express.Router();
const detailStockController = require("../controllers/DetailStockController");

// Rute untuk mendapatkan data detail stock berdasarkan id_detail_stock
router.get("/:id", detailStockController.getDetailStockById);

// Rute untuk mengupdate data detail stock berdasarkan id_detail_stock
router.put("/:id", detailStockController.updateDetailStockById);

// Rute untuk mengupdate beberapa data detail stock sekaligus
router.put("/update-multiple", detailStockController.updateMultipleDetailStock);

module.exports = router;
