const express = require("express");
const router = express.Router();
const detailStockController = require("../controllers/Stocksdetail");

router.get("/", detailStockController.getAllDetailStock);
router.get("/id/:id", detailStockController.getDetailStockById);
router.get("/no/:stockNo", detailStockController.getDetailStockByStockNo);
router.post("/", detailStockController.createDetailStock);
// Rute untuk mengupdate data detail stock berdasarkan id_detail_stock
router.put("/:id", detailStockController.updateDetailStockById);
router.delete("/:id", detailStockController.deleteDetailStock);

module.exports = router;
