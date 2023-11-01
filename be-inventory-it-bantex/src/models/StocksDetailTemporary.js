const mysql = require("mysql2");

class DetailStockTemporary {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk mengambil semua data detail stok temporary
  getAllDetailStocksTemporary(callback) {
    this.connection.query(
      "SELECT * FROM detail_stock_temporary",
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, results);
      }
    );
  }

  // Metode untuk menambahkan data detail stok temporary
  addDetailStockTemporary(data, callback) {
    this.connection.query(
      "INSERT INTO detail_stock_temporary (stock_detail_description, qty, brand, additional_info, note, post_user_id, post_username, post_date, id_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [data.post_user_id, data.post_username, data.post_date, data.id_stock],
      data.stock_no,
      data.category,
      data.unit,
      data.post_user_id,
      data.post_username,
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, result);
      }
    );
  }

  createDetailStockTemporary(detailStockData, callback) {
    // Dapatkan data yang sesuai dengan kolom yang dibutuhkan
    const values = detailStockData.map((data) => [
      data.stock_no,
      data.stock_detail_description,
      data.qty,
      data.brand,
      data.additional_info,
      data.note,
      data.post_user_id,
      data.post_username,
    ]);

    // Buat placeholders
    const placeholders = values
      .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
      .join(", ");
    const SQLQuery = `INSERT INTO detail_stock_temporary (stock_no, stock_detail_description, qty, brand, additional_info, note, post_user_id, post_username) VALUES ${placeholders};`;
    // Flatten values
    const flattenedValues = values.reduce(
      (acc, value) => acc.concat(value),
      []
    );

    this.connection.query(SQLQuery, flattenedValues, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.insertId);
      }
    });
  }
}

module.exports = DetailStockTemporary;
