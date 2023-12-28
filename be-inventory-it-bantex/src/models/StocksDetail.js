const mysql = require("mysql2");

class StocksModel {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk menambahkan detail stok (bisa lebih dari satu data sekaligus)
  createDetailStock(detailStockData, callback) {
    // Dapatkan data yang sesuai dengan kolom yang dibutuhkan
    const values = detailStockData.map((data) => [
      data.stock_no,
      data.stock_detail_description,
      data.qty,
      data.brand,
      data.additional_info,
      data.note,
    ]);

    // Buat placeholders
    const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
    const SQLQuery = `INSERT INTO detail_stock (stock_no, stock_detail_description, qty, brand, additional_info, note) VALUES ${placeholders};`;

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
  // Metode untuk mengambil semua data detail stok
  getAllDetailStock(callback) {
    const query = "SELECT * FROM detail_stock";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data detail stok berdasarkan ID
  getDetailStockById(detailStockId, callback) {
    const query = "SELECT * FROM detail_stock WHERE id_detail_stock = ?";
    this.connection.query(query, [detailStockId], (error, result) => {
      callback(error, result[0]);
    });
  }

  //  metode mengambil data detail stock di atas qty 1
  getDetailStockQtyAboveOne(stockNo, callback) {
    const query = `SELECT * FROM detail_stock WHERE qty > 0 AND stock_no = ?;`;
    this.connection.query(query, [stockNo], (error, results) => {
      callback(error, results);
    });
  }

  getDetailStockByStockNo(stockNo, callback) {
    const query = "SELECT * FROM detail_stock WHERE stock_no = ?";
    this.connection.query(query, [stockNo], (error, results) => {
      callback(error, results);
    });
  }

  // getDetailStockByStockNo(stockNo, callback) {
  //   const query = "SELECT * FROM detail_stock WHERE stock_no = ? AND qty > 0;";
  //   this.connection.query(query, [stockNo], (error, results) => {
  //     callback(error, results);
  //   });
  // }

  // // Metode untuk mengurangkan jumlah stok untuk beberapa detail berdasarkan id_detail_stock
  // updateMultipleDetailStocks(updatedData, callback) {
  //   const query =
  //     "UPDATE detail_stock SET qty = qty - ? WHERE id_detail_stock = ?";
  //   const updatePromises = updatedData.map(({ id_detail_stock, qty }) => {
  //     return new Promise((resolve, reject) => {
  //       this.connection.query(query, [qty, id_detail_stock], (error) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve();
  //         }
  //       });
  //     });
  //   });

  //   // Eksekusi semua promise pembaruan
  //   Promise.all(updatePromises)
  //     .then(() => {
  //       callback(null);
  //     })
  //     .catch((error) => {
  //       callback(error);
  //     });
  // }

  updateMultipleDetailStock(data, callback) {
    const query =
      "UPDATE detail_stock SET qty = qty - ? WHERE id_detail_stock = ?";
    const updatePromises = data.map(({ id_detail_stock, qty }) => {
      console.log(id_detail_stock, qty);
      return new Promise((resolve, reject) => {
        this.connection.query(query, [qty, id_detail_stock], (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        callback(null);
      })
      .catch((error) => {
        callback(error);
      });
  }

  updatePlusDetailStock(data, callback) {
    const query =
      "UPDATE detail_stock SET qty = qty + ? WHERE id_detail_stock = ?";
    const updatePromises = data.map(({ id_detail_stock, qty }) => {
      return new Promise((resolve, reject) => {
        this.connection.query(query, [qty, id_detail_stock], (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        callback(null);
      })
      .catch((error) => {
        callback(error);
      });
  }

  // Mengupdate data detail stock berdasarkan id_detail_stock
  updateDetailStockById(id, updatedData, callback) {
    const query =
      "UPDATE detail_stock SET stock_detail_description = ?, qty = ?, brand = ?, additional_info = ?, note = ?, stock_no = ? WHERE id_detail_stock = ?";
    const {
      stock_detail_description,
      qty,
      brand,
      additional_info,
      note,
      stock_no,
    } = updatedData;
    this.connection.query(
      query,
      [
        stock_detail_description,
        qty,
        brand,
        additional_info,
        note,
        stock_no,
        id,
      ],
      (error) => {
        callback(error);
      }
    );
  }
  // Metode untuk mengupdate data detail stok
  // updateAllDetailStock(detailStockData, callback) {
  //   const query =
  //     "UPDATE detail_stock SET stock_detail_description = ?, qty = ?, unit = ?, brand = ? WHERE id_detail_stock = ?";
  //   const values = detailStockData.map((detail) => [
  //     detail.stock_detail_description,
  //     detail.qty,
  //     detail.unit,
  //     detail.brand,
  //     detail.id_detail_stock,
  //   ]);
  //   this.connection.query(query, [values], (error) => {
  //     callback(error);
  //   });
  // }

  // Metode untuk menghapus data detail stok
  deleteDetailStock(detailStockId, callback) {
    const query = "DELETE FROM detail_stock WHERE id_detail_stock = ?";
    this.connection.query(query, [detailStockId], (error) => {
      callback(error);
    });
  }
}

module.exports = StocksModel;
