const express = require("express");

const router = express.Router();
const userController = require("../controllers/Users");

router.get("/", userController.getAllUsers);
router.post("/", userController.createNewUser);
// router.patch(`/:id`, userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
