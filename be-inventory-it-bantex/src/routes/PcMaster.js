const express = require("express");

const router = express.Router();
const PcMasterController = require("../controllers/PcMaster");

router.get("/", PcMasterController.getAllPcMaster);
router.get("/:id", PcMasterController.getPcMasterById);
router.post("/", PcMasterController.createPcMaster);

module.exports = router;
