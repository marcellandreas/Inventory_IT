const express = require("express");

const router = express.Router();
const PcMasterController = require("../controllers/PcMaster");

router.get("/", PcMasterController.getAllPcMaster);

module.exports = router;
