const CategoryModel = require("../models/categoriesModel");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const categoryModel = new CategoryModel(dbConfig);

// Menampilkan semua kategori
exports.getAllCategories = (req, res) => {
  categoryModel.getAllCategories((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(results);
  });
};

// Membuat kategori baru
exports.createCategory = (req, res) => {
  const categoryData = {
    category: req.body.category,
    note: req.body.note || null,
  };

  categoryModel.createCategory(categoryData, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: "Category created", id: result.insertId });
  });
};

// Mendapatkan kategori berdasarkan ID
exports.getCategoryById = (req, res) => {
  const categoryId = req.params.id;

  categoryModel.getCategoryById(categoryId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!result) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(result);
  });
};

// Mengupdate kategori berdasarkan ID
exports.updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const categoryData = {
    category: req.body.category,
    note: req.body.note || null,
  };

  categoryModel.updateCategory(categoryId, categoryData, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({
      message: "Category updated",
      data: {
        id: categoryId,
        category: categoryData.category,
        note: categoryData.note,
      },
    });
  });
};

// Menghapus kategori berdasarkan ID

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  categoryModel.deleteCategory(categoryId, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    } else {
      res.status(200).json({
        message: "Category berhasil dihapus",
        data: {
          id: categoryId,
        },
      });
    }
  });
};
