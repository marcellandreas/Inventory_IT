// routers/dataRouter.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Menggunakan middleware pada rute yang perlu diotentikasi
router.get("/protectedData", authMiddleware, (req, res) => {
  // Hanya pengguna yang telah diotentikasi dapat mengakses rute ini
  res.json({ message: "Protected data accessed", user: req.user });
});

module.exports = router;
