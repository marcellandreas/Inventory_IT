const express = require("express");

const router = express.Router();
const divisionAndPTController = require("../controllers/DivisionAndPT");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);

// pt
router.get("/", divisionAndPTController.getAllDataPT);
router.get("/pt/:id", divisionAndPTController.getPtById);
router.put("/pt/:id", divisionAndPTController.updatePt);
router.post("/pt", divisionAndPTController.createPt);
router.delete("/Pt/:id", divisionAndPTController.deletePt);

// division
router.get("/division/:name_pt", divisionAndPTController.getDivisionByNamePt);
router.post("/division", divisionAndPTController.createDivision);
router.get("/divId/:id", divisionAndPTController.getDivisionById);
router.put("/division/:id", divisionAndPTController.updateDivision);
router.delete("/division/:id", divisionAndPTController.deleteDivision);

module.exports = router;
