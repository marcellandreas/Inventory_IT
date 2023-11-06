const express = require("express");
const router = express.Router();
const detailStockController = require("../controllers/Stocksdetail");

router.get("/", detailStockController.getAllDetailStock);
router.get("/id/:id", detailStockController.getDetailStockById);
router.get("/no/:stockNo", detailStockController.getDetailStockByStockNo);
router.get("/qty/", detailStockController.getDetailStockQtyAboveOne);
router.post("/", detailStockController.createDetailStock);
// Rute untuk mengupdate data detail stock berdasarkan id_detail_stock
router.put("/id/:id", detailStockController.updateDetailStockById);
router.delete("/:id", detailStockController.deleteDetailStock);

// Rute untuk pembaruan multi data detail stok
// Rute untuk mengupdate lebih dari satu data
router.put("/update-multiple", detailStockController.updateMultipleDetailStock);
router.put("/update-plus", detailStockController.updatePlusDetailStock);

module.exports = router;
