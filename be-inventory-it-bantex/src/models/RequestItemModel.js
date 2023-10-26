const mysql = require("mysql2");

class RequestItems {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk membuat entri baru request items
  createRequestItems(requestItems, callback) {
    const query =
      "INSERT INTO request_items (no_pengajuan, stock_description, qty, note) VALUES ?";
    const values = requestItems.map((item) => [
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
  getAllSubmissionItems(callback) {
    const query = "SELECT * FROM request_items";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data request items berdasarkan ID
  getSubmissionItemsById(id_submission_item, callback) {
    const query = "SELECT * FROM request_items WHERE id_submission_item = ?";
    this.connection.query(query, [id_submission_item], (error, results) => {
      callback(error, results[0]);
    });
  }

  // Metode untuk mengambil data request items berdasarkan sub_no
  getSubmissionItemsBySubNo(sub_no, callback) {
    const query = "SELECT * FROM request_items WHERE sub_no = ?";
    this.connection.query(query, [sub_no], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk memperbarui data request items berdasarkan ID
  updateSubmissionItemsById(id_submission_item, updatedData, callback) {
    const query = "UPDATE request_items SET ? WHERE id_submission_item = ?";
    this.connection.query(
      query,
      [updatedData, id_submission_item],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk memperbarui data request items berdasarkan sub_no
  updateSubmissionItemsBySubNo(sub_no, updatedData, callback) {
    const query = "UPDATE request_items SET ? WHERE sub_no = ?";
    this.connection.query(query, [updatedData, sub_no], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk menghapus data request items berdasarkan ID
  deleteSubmissionItemsById(id_submission_item, callback) {
    const query = "DELETE FROM request_items WHERE id_submission_item = ?";
    this.connection.query(query, [id_submission_item], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = SubmissionItems;
