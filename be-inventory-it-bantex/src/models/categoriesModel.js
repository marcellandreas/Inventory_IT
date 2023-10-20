const mysql = require("mysql2");

class CategoryModel {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk mengambil semua data kategori
  getAllCategories(callback) {
    const query = "SELECT * FROM categories";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk menambahkan kategori baru
  createCategory(categoryData, callback) {
    const query = "INSERT INTO categories (category, note) VALUES (?, ?)";
    this.connection.query(
      query,
      [categoryData.category, categoryData.note],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  // Metode untuk mengambil kategori berdasarkan ID
  getCategoryById(categoryId, callback) {
    const query = "SELECT * FROM categories WHERE id_category = ?";
    this.connection.query(query, [categoryId], (error, result) => {
      callback(error, result[0]); // Mengambil hasil pertama karena id adalah unik
    });
  }

  // Metode untuk mengupdate kategori berdasarkan ID
  updateCategory(categoryId, categoryData, callback) {
    const query =
      "UPDATE categories SET category = ?, note = ? WHERE id_category = ?";
    this.connection.query(
      query,
      [categoryData.category, categoryData.note, categoryId],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  // Metode untuk menghapus kategori berdasarkan ID
  deleteCategory(categoryId, callback) {
    const query = "DELETE FROM categories WHERE id_category = ?";
    this.connection.query(query, [categoryId], (error, result) => {
      callback(error, result);
    });
  }
}

module.exports = CategoryModel;
