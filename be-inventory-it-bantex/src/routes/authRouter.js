// routers/authRouter.js
const express = require("express");
const authController = require("../controllers/AuthController.js");

const router = express.Router();
const { verifyAccessToken: token } = require("../middleware/Verify-jwt.js");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/recordlogin", authController.recordLogin);
router.get("/lastlogin/:username", token, authController.getLastLogin);
router.get("/alllogins", token, authController.getAllLogins);
router.get("/latest", token, authController.getDataLoginsLatest);
router.get("/history", token, authController.getAllDataHistoryLogin);
// router.delete("/user/:username", userController.deleteUser);
// Dist
router.get("/allusers", token, authController.getAllUsers);
router.put("/user/:id_user", token, authController.editUser);
router.get("/user/role/:role", token, authController.getUserByRole);
// router.post("/changepassword", token ,authController.changePassword);
router.get("/user/:id_user", token, authController.getUserByID);
router.get("/profile", token, authController.getUserProfile);
router.put("/profile/:id", token, authController.updateUserProfile);
// role1 gk kepakai
// router.get("/user/role1", token, authController.getUserByRole1);

// Rute untuk mengambil daftar peran pengguna tanpa duplikasi
router.get("/unique", token, authController.getUniqueRoles);

module.exports = router;
