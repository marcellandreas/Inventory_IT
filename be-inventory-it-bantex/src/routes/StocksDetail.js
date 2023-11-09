const express = require("express");
const router = express.Router();
const detailStockController = require("../controllers/Stocksdetail");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
router.get("/", detailStockController.getAllDetailStock);
router.get("/id/:id", detailStockController.getDetailStockById);
router.get("/no/:stockNo", detailStockController.getDetailStockByStockNo);
router.get("/qty/", detailStockController.getDetailStockQtyAboveOne);
// create
router.post("/", detailStockController.createDetailStock);
// edit by id
router.put("/id/:id", detailStockController.updateDetailStockById);
// hapus
router.delete("/:id", detailStockController.deleteDetailStock);
// pengurangan stock
router.put("/update-multiple", detailStockController.updateMultipleDetailStock);
// penambahan stock
router.put("/update-plus", detailStockController.updatePlusDetailStock);

module.exports = router;
