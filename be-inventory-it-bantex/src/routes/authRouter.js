// routers/authRouter.js
const express = require("express");
const authController = require("../controllers/Users22");
const authMiddleware = require("../middleware/authMiddleware");
const { verifyAccessToken } = require("../middleware/Verify-jwt");
const authenticateJWT = require("../middleware/authentication");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/recordlogin", authController.recordLogin);
router.get("/lastlogin/:username", authController.getLastLogin);
router.get("/alllogins", authController.getAllLogins);
// router.delete("/user/:username", userController.deleteUser);
router.get("/allusers", authController.getAllUsers);
router.put("/user/:id_user", authController.editUser);
// router.post("/changepassword", authController.changePassword);
// router.get("/user/:id_user", authController.getUserByID);

module.exports = router;
