const mysql = require("mysql2");

class Stock {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  getAllStocks(callback) {
    this.connection.query("SELECT * FROM stocks", (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  createStock(
    stock_description,
    stock_qty,
    category,
    unit,
    type,
    note,
    post_user_id,
    post_username,
    callback
  ) {
    this.generateUserCode((generateCodeError, code) => {
      if (generateCodeError) {
        callback(generateCodeError, null);
      } else {
        this.connection.query(
          "INSERT INTO stocks (stock_no, stock_description, stock_qty, category, unit, type, note, post_user_id, post_username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            code,
            stock_description,
            stock_qty,
            category,
            unit,
            type,
            note,
            post_user_id,
            post_username,
          ],
          (error, result) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, code);
            }
          }
        );
      }
    });
  }

  generateUserCode(callback) {
    const rolePrefix = "IT-ST-";
    const query = "SELECT MAX(stock_no) AS max_stock FROM stocks";
    this.connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }

      let code = "001";

      if (results[0].max_stock) {
        const maxCode = results[0].max_stock;
        const maxNumber = parseInt(maxCode.substr(6), 10);
        const nextNumber = maxNumber + 1;
        code = nextNumber.toString().padStart(3, "0");
      }

      const stockCode = `${rolePrefix}${code}`;
      callback(null, stockCode);
    });
  }

  updateStock(
    stock_no,
    stock_description,
    stockQty,
    category,
    unit,
    type,
    note,
    post_user_id,
    post_username,
    callback
  ) {
    this.connection.query(
      "UPDATE stocks SET stock_description = ?, stock_qty = ?, category = ?, unit = ?, type = ?, note = ?, post_user_id = ?, post_username = ? WHERE stock_no = ?",
      [
        stock_description,
        stockQty,
        category,
        unit,
        type,
        note,
        post_user_id,
        post_username,
        stock_no,
      ],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, result);
      }
    );
  }

  deleteStock(id, callback) {
    this.connection.query(
      "DELETE FROM stocks WHERE id_stock = ?",
      [id],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, result);
      }
    );
  }

  getStockById(id, callback) {
    this.connection.query(
      "SELECT * FROM stocks WHERE id_stock = ?",
      [id],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        if (results.length > 0) {
          callback(null, results[0]);
        } else {
          callback(null, null);
        }
      }
    );
  }

  getStockByStockNo(stockNo, callback) {
    this.connection.query(
      "SELECT * FROM stocks WHERE stock_no = ?",
      [stockNo],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        if (results.length > 0) {
          callback(null, results[0]);
        } else {
          callback(null, null);
        }
      }
    );
  }

  getStockByStockNo2(stock_no) {
    console.log("models stock 2", stock_no);
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM stocks WHERE stock_no = ?";
      this.connection.query(query, [stock_no], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  getStockByStockNoEmail(stock_no) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM stocks WHERE stock_no = ?";
      this.connection.query(query, [stock_no], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  // Metode untuk menghitung total qty dari detail stok berdasarkan stock_no
  calculateStockQty(stockNo, callback) {
    const query =
      "SELECT SUM(qty) AS total_qty FROM detail_stock WHERE stock_no = ?";
    this.connection.query(query, [stockNo], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0].total_qty);
      }
    });
  }

  // Metode untuk mengupdate stock_qty dalam tabel stocks
  updateStockQty(stockNo, callback) {
    const query = `UPDATE stocks
    SET stock_qty = (SELECT SUM(qty) FROM detail_stock WHERE stock_no = '${stockNo}')
    WHERE stock_no = '${stockNo}'`;
    this.connection.query(query, [stockNo], (error) => {
      callback(error);
    });
  }

  getUniqueStockNo(callback) {
    const query = "SELECT DISTINCT stock_no FROM stocks";

    this.connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        const stock_no = results.map((result) => result.stock_no);
        callback(null, stock_no);
      }
    });
  }
}

module.exports = Stock;
