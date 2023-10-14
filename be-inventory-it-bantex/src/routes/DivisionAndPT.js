const express = require("express");

const router = express.Router();
const divisionAndPTController = require("../controllers/DivisionAndPT");
// const { verifyAccessToken } = require("../middleware/Verify-jwt");

router.get("/", divisionAndPTController.getAllDataPT);
router.get("/division/:name_pt", divisionAndPTController.getDivisionByNamePt);
// router.post("/", itemsController.createNewItem);
// router.patch("/:id", itemsController.updateUser2);
// router.delete("/:id", itemsController.delateItem);

module.exports = router;
