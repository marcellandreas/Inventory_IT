const mysql = require("mysql2");

class StockRequest {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }
  // Metode untuk membuat entri baru request item
  createStockRequest(stockRequest, callback) {
    const query =
      "INSERT INTO stock_request (no_pengajuan, stock_no, stock_description, qty, note) VALUES ?";
    const values = stockRequest.map((item) => [
      item.no_pengajuan,
      item.stock_no,
      item.stock_description,
      item.qty,
      item.note,
    ]);

    this.connection.query(query, [values], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil semua data request item

  getAllStockRequest(callback) {
    const query = "SELECT * FROM stock_request";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data request item berdasarkan ID
  getStockRequestById(id_submission_item, callback) {
    const query = "SELECT * FROM stock_request WHERE id_submission_item = ?";
    this.connection.query(query, [id_submission_item], (error, results) => {
      callback(error, results[0]);
    });
  }

  // Metode untuk mengambil data request item berdasarkan sub_no
  getStockRequestBySubNo(sub_no, callback) {
    const query = "SELECT * FROM stock_request WHERE sub_no = ?";
    this.connection.query(query, [sub_no], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk memperbarui data request item berdasarkan ID
  updateStockRequestById(id_submission_item, updatedData, callback) {
    const query = "UPDATE stock_request SET ? WHERE id_submission_item = ?";
    this.connection.query(
      query,
      [updatedData, id_submission_item],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk memperbarui data request item berdasarkan sub_no
  updateStockRequestBySubNo(sub_no, updatedData, callback) {
    const query = "UPDATE stock_request SET ? WHERE sub_no = ?";
    this.connection.query(query, [updatedData, sub_no], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk menghapus data request item berdasarkan ID

  deleteStockRequestById(id_submission_item, callback) {
    const query = "DELETE FROM stock_request WHERE id_submission_item = ?";
    this.connection.query(query, [id_submission_item], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = StockRequest;
