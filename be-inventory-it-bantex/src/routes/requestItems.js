const express = require("express");
const router = express.Router();
const requestItemsController = require("../controllers/requestItems");

// Rute untuk membuat entri baru submission items
router.post("/", requestItemsController.createRequestItems);

// Rute untuk mendapatkan semua data submission items
router.get("/", requestItemsController.getAllRequestItems);

// Rute untuk mendapatkan data submission items berdasarkan ID
router.get("/id/:id", requestItemsController.getRequestItemsById);

// Rute untuk memperbarui data submission items berdasarkan ID
router.put("/id/:id", requestItemsController.updateRequestItemsById);

// Rute untuk menghapus data submission items berdasarkan ID
router.delete("/id/:id", requestItemsController.deleteRequestItemsById);

module.exports = router;
