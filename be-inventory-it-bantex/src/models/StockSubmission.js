const mysql = require("mysql2");

class StockSubmission {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk membuat entri baru request items
  createStockSubmission(stockSubmission, callback) {
    const query =
      "INSERT INTO stock_submission (no_pengajuan, stock_no, stock_description, qty, note, 	id_detail_stock) VALUES ?";
    const values = stockSubmission.map((item) => [
      item.no_pengajuan,
      item.stock_no,
      item.stock_description,
      item.qty,
      item.note,
      item.id_detail_stock,
    ]);

    this.connection.query(query, [values], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil semua data request items
  getAllStockSubmission(callback) {
    const query = "SELECT * FROM stock_submission";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data request items berdasarkan ID
  getStockSubmissionById(id_stock_sub, callback) {
    const query = "SELECT * FROM stock_submission WHERE id_stock_sub = ?";
    this.connection.query(query, [id_stock_sub], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk memperbarui data request items berdasarkan ID
  updateStockSubmissionById(id_stock_sub, updatedData, callback) {
    const query = "UPDATE stock_submission SET ? WHERE id_stock_sub = ?";
    this.connection.query(
      query,
      [updatedData, id_stock_sub],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk menghapus data request items berdasarkan ID
  deleteStockSubmissionById(id_stock_sub, callback) {
    const query = "DELETE FROM stock_submission WHERE id_stock_sub = ?";
    this.connection.query(query, [id_stock_sub], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = StockSubmission;
