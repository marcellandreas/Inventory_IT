const express = require("express");
const router = express.Router();
const createPengajuanContro = require("../controllers/CreatePengajuan.js");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
router.post("/", createPengajuanContro.createPengajuan);

module.exports = router;
