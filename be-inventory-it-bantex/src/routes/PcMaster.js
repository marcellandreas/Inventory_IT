const express = require("express");

const router = express.Router();
const PcMasterController = require("../controllers/PcMaster");

router.get("/", PcMasterController.getAllPcMaster);
// router.get("/:id", PcMasterController.getPcMasterById);
router.get("/:pcno", PcMasterController.getPcMasterByPcNo);
router.post("/", PcMasterController.createPcMaster);
router.patch("/:id", PcMasterController.UpdatePcMaster);
router.delete("/:id", PcMasterController.deletePcMaster);

module.exports = router;
