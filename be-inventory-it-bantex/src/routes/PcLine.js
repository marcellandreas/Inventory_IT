const express = require("express");

const router = express.Router();
const PcLineController = require("../controllers/PcLine");

router.get("/", PcLineController.getAllPcLine);
router.get("/:pcno", PcLineController.getDataPcLineByPcNo);

module.exports = router;
