const express = require("express");

const router = express.Router();
const PcLineController = require("../controllers/PcLine");

router.get("/", PcLineController.getAllPcLine);
router.post("/", PcLineController.createPcLine);
router.get("/:pcno", PcLineController.getDataPcLineByPcNo);
router.delete("/:item_no", PcLineController.delatePcLine);

module.exports = router;
