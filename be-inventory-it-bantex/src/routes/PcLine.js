const express = require("express");

const router = express.Router();
const PcLineController = require("../controllers/PcLine");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
router.get("/", PcLineController.getAllPcLine);
router.post("/", PcLineController.createPcLine);
router.get("/:pcno", PcLineController.getDataPcLineByPcNo);
router.delete("/delete", PcLineController.deleteMulti);

module.exports = router;
