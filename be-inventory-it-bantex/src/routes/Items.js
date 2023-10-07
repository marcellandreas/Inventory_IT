const express = require("express");

const router = express.Router();
const itemsController = require("../controllers/Items");
const { verifyAccessToken } = require("../middleware/Verify-jwt");

router.get("/", itemsController.getAllItems);
router.get("/:id", itemsController.getItemById);
router.post("/", itemsController.createNewItem);
router.patch("/:id", itemsController.updateItem);
// router.patch("/:id", itemsController.updateUser2);
router.delete("/:id", itemsController.delateItem);

module.exports = router;
