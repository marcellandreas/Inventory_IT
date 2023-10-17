const express = require("express");

const router = express.Router();
const itemsController = require("../controllers/Items");
const { verifyAccessToken } = require("../middleware/Verify-jwt");

router.get("/", itemsController.getAllItems);
router.get("/by/:id", itemsController.getItemById);
router.get("/unused", itemsController.getUnusedItemNo);
router.post("/", itemsController.createNewItem);
router.patch("/:id", itemsController.updateItem);
router.delete("/:id", itemsController.delateItem);

module.exports = router;
