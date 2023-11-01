const mysql = require("mysql2");

class StockTemporary {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk mengambil semua data stok temporary
  getAllStocksTemporary(callback) {
    this.connection.query("SELECT * FROM stock_temporary", (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  // Metode untuk menambahkan data stok temporary
  addStockTemporary(data, callback) {
    this.connection.query(
      "INSERT INTO stock_temporary (stock_description, stock_no, category, unit, type, note, post_user_id, post_username, post_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.stock_description,
        data.stock_no,
        data.category,
        data.unit,
        data.type,
        data.note,
        data.post_user_id,
        data.post_username,
        data.post_date,
      ],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, result);
      }
    );
  }
}

module.exports = StockTemporary;
