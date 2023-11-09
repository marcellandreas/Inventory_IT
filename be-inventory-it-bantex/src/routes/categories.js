const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");
const { verifyAccessToken } = require("../middleware/Verify-jwt.js");

router.use(verifyAccessToken);
// Menampilkan semua kategori
router.get("/", categoriesController.getAllCategories);

// Membuat kategori baru
router.post("/", categoriesController.createCategory);

// Mendapatkan kategori berdasarkan ID
router.get("/:id", categoriesController.getCategoryById);

// Mengupdate kategori berdasarkan ID
router.put("/:id", categoriesController.updateCategory);

// Menghapus kategori berdasarkan ID
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
