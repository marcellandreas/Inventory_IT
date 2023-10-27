const mysql = require("mysql2");

class StockSubmission {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk membuat entri baru request items
  createStockSubmission(stockSubmission, callback) {
    const query =
      "INSERT INTO stock_submission (no_pengajuan, stock_description, qty, note) VALUES ?";
    const values = stockSubmission.map((item) => [
      item.no_pengajuan,
      item.stock_description,
      item.qty,
      item.note,
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
  getStockSubmissionById(id_request_items, callback) {
    const query = "SELECT * FROM stock_submission WHERE id_request_items = ?";
    this.connection.query(query, [id_request_items], (error, results) => {
      callback(error, results[0]);
    });
  }

  // Metode untuk memperbarui data request items berdasarkan ID
  updateStockSubmissionById(id_request_items, updatedData, callback) {
    const query = "UPDATE stock_submission SET ? WHERE id_request_items = ?";
    this.connection.query(
      query,
      [updatedData, id_request_items],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk menghapus data request items berdasarkan ID
  deleteStockSubmissionById(id_request_items, callback) {
    const query = "DELETE FROM stock_submission WHERE id_request_items = ?";
    this.connection.query(query, [id_request_items], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = StockSubmission;
