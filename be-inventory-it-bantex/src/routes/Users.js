const express = require("express");

const router = express.Router();
const userController = require("../controllers/Users");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById)
router.post("/", userController.createNewUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.delateUser);

module.exports = router;
