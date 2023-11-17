// routers/authRouter.js
const express = require("express");
const authController = require("../controllers/Users22");

const router = express.Router();
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/recordlogin", authController.recordLogin);
router.get(
  "/lastlogin/:username",
  verifyAccessToken,
  authController.getLastLogin
);
router.get("/alllogins", verifyAccessToken, authController.getAllLogins);
router.get("/latest", verifyAccessToken, authController.getDataLoginsLatest);
router.get(
  "/history",
  verifyAccessToken,
  authController.getAllDataHistoryLogin
);
// router.delete("/user/:username", userController.deleteUser);
// Dist
router.get("/allusers", verifyAccessToken, authController.getAllUsers);
router.put("/user/:id_user", verifyAccessToken, authController.editUser);
router.get("/user/role/:role", verifyAccessToken, authController.getUserByRole);
// router.post("/changepassword", verifyAccessToken ,authController.changePassword);
router.get("/user/:id_user", verifyAccessToken, authController.getUserByID);

// role1 gk kepakai
// router.get("/user/role1", verifyAccessToken, authController.getUserByRole1);

// Rute untuk mengambil daftar peran pengguna tanpa duplikasi
router.get("/unique", verifyAccessToken, authController.getUniqueRoles);

module.exports = router;
