const express = require("express");

const router = express.Router();
const stocksController = require("../controllers/Stocks");

router.get("/", stocksController.getAllUsers);
router.get("/:id", stocksController.getStockById);
router.post("/", stocksController.createNewStock);
router.patch("/:id", stocksController.updateStock);
router.delete("/:id", stocksController.delateStock);

module.exports = router;
