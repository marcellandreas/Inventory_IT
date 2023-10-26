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
  getAllRequestItems(callback) {
    const query = "SELECT * FROM request_items";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data request items berdasarkan ID
  getRequestItemsById(id_request_items, callback) {
    const query = "SELECT * FROM request_items WHERE id_request_items = ?";
    this.connection.query(query, [id_request_items], (error, results) => {
      callback(error, results[0]);
    });
  }

  // Metode untuk memperbarui data request items berdasarkan ID
  updateRequestItemsById(id_request_items, updatedData, callback) {
    const query = "UPDATE request_items SET ? WHERE id_request_items = ?";
    this.connection.query(
      query,
      [updatedData, id_request_items],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk menghapus data request items berdasarkan ID
  deleteRequestItemsById(id_request_items, callback) {
    const query = "DELETE FROM request_items WHERE id_request_items = ?";
    this.connection.query(query, [id_request_items], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = RequestItems;
