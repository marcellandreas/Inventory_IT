const mysql = require("mysql2");

class SubmissionItems {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk membuat entri baru submission items
  createSubmissionItems(submissionItems, callback) {
    const query =
      "INSERT INTO submission_items (no_pengajuan, sub_no, stock_description, qty, note) VALUES ?";
    const values = submissionItems.map((item) => [
      item.no_pengajuan,
      item.sub_no,
      item.stock_description,
      item.qty,
      item.note,
    ]);

    this.connection.query(query, [values], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil semua data submission items
  getAllSubmissionItems(callback) {
    const query = "SELECT * FROM submission_items";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data submission items berdasarkan ID
  getSubmissionItemsById(id_submission_item, callback) {
    const query = "SELECT * FROM submission_items WHERE id_submission_item = ?";
    this.connection.query(query, [id_submission_item], (error, results) => {
      callback(error, results[0]);
    });
  }

  // Metode untuk mengambil data submission items berdasarkan sub_no
  getSubmissionItemsBySubNo(sub_no, callback) {
    const query = "SELECT * FROM submission_items WHERE sub_no = ?";
    this.connection.query(query, [sub_no], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk memperbarui data submission items berdasarkan ID
  updateSubmissionItemsById(id_submission_item, updatedData, callback) {
    const query = "UPDATE submission_items SET ? WHERE id_submission_item = ?";
    this.connection.query(
      query,
      [updatedData, id_submission_item],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk memperbarui data submission items berdasarkan sub_no
  updateSubmissionItemsBySubNo(sub_no, updatedData, callback) {
    const query = "UPDATE submission_items SET ? WHERE sub_no = ?";
    this.connection.query(query, [updatedData, sub_no], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk menghapus data submission items berdasarkan ID
  deleteSubmissionItemsById(id_submission_item, callback) {
    const query = "DELETE FROM submission_items WHERE id_submission_item = ?";
    this.connection.query(query, [id_submission_item], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = SubmissionItems;
