const CategoryModel = require("../models/categoriesModel");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const categoryModel = new CategoryModel(dbConfig);
const sendErrorRes = (res, statusCode, message, error) => {
  res
    .status(statusCode)
    .json({ success: false, message, error: error.message });
};

const sendSuccessRes = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message, data });
};

exports.getAllCategories = (req, res) => {
  categoryModel.getAllCategories((error, data) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Mengambil Data Categories", error);
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      sendSuccessRes(res, 200, "Berhasil Mengambil Data Categories", data);
    }
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
  const { id } = req.params;
  categoryModel.getCategoryById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mengambil Data Item Berdasarkan Id", data });
    }
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
      console.log(error);
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
