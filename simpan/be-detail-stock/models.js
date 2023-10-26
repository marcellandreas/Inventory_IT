class DetailStock {
  constructor(connection) {
    this.connection = connection;
  }

  // Mendapatkan data detail stock berdasarkan id_detail_stock
  getDetailStockById(id, callback) {
    const query = "SELECT * FROM detail_stock WHERE id_detail_stock = ?";
    this.connection.query(query, [id], (error, result) => {
      callback(error, result[0]);
    });
  }

  // Mengupdate data detail stock berdasarkan id_detail_stock
  updateDetailStockById(id, updatedData, callback) {
    const query =
      "UPDATE detail_stock SET stock_detail_description = ?, qty = ?, category = ?, unit = ?, brand = ?, additional_info = ?, note = ?, stock_no = ? WHERE id_detail_stock = ?";
    const {
      stock_detail_description,
      qty,
      category,
      unit,
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
        category,
        unit,
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

  // Mengupdate beberapa data detail stock sekaligus
  updateMultipleDetailStock(detailStockData, callback) {
    const updatePromises = detailStockData.map((data) => {
      const {
        id_detail_stock,
        stock_detail_description,
        qty,
        category,
        unit,
        brand,
        additional_info,
        note,
        stock_no,
      } = data;
      const query =
        "UPDATE detail_stock SET stock_detail_description = ?, qty = ?, category = ?, unit = ?, brand = ?, additional_info = ?, note = ?, stock_no = ? WHERE id_detail_stock = ?";
      return new Promise((resolve, reject) => {
        this.connection.query(
          query,
          [
            stock_detail_description,
            qty,
            category,
            unit,
            brand,
            additional_info,
            note,
            stock_no,
            id_detail_stock,
          ],
          (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
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
}

module.exports = DetailStock;
