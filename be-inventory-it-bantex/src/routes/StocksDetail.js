const express = require("express");
const router = express.Router();
const StocksDetail = require("../controllers/Stocksdetail");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
router.get("/", StocksDetail.getAllDetailStock);
router.get("/id/:id", StocksDetail.getDetailStockById);
router.get("/no/:stockNo", StocksDetail.getDetailStockByStockNo);
router.get("/qty/:stockNo", StocksDetail.getDetailStockQtyAboveOne);
// create
router.post("/", StocksDetail.createDetailStock);
// edit by id
router.put("/id/:id", StocksDetail.updateDetailStockById);
// hapus
router.delete("/:id", StocksDetail.deleteDetailStock);
// pengurangan stock
router.put("/update-multiple", StocksDetail.updateMultipleDetailStock);
// penambahan stock
router.put("/update-plus", StocksDetail.updatePlusDetailStock);

module.exports = router;
