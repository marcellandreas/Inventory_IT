const mysql = require("mysql2");

class Items {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  getAllItems(callback) {
    const SQLQuery = "SELECT * FROM items";
    this.connection.query(SQLQuery, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  getItemById(id, callback) {
    const SQLQuery = "SELECT * FROM items WHERE id = ?";

    this.connection.query(SQLQuery, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    });
  }

  getUnusedItemNo(callback) {
    const SQLQuery =
      "SELECT * FROM items WHERE item_no NOT IN (SELECT item_no FROM pc_linee)";
    this.connection.query(SQLQuery, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  createNewItem(body, callback) {
    this.generateItemsCode(body.category, (generateCodeError, code) => {
      if (generateCodeError) {
        callback(generateCodeError, null);
      } else {
        this.connection.query(
          `INSERT INTO items (item_no, item_description, unit, category, brand, status, kondisi, item_location, note, date_registation, date_expired, item_specification, post_user_id, post_username)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            code,
            body.item_description,
            body.unit,
            body.category,
            body.brand,
            body.status,
            body.kondisi,
            body.item_location,
            body.note,
            body.date_registation,
            body.date_expired,
            body.item_specification,
            body.post_user_id,
            body.post_username,
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

  generateItemsCode(category, callback) {
    this.getCategoryPrefix(category, (error, categoriesPrefix) => {
      if (error) {
        callback(error, null);
        return;
      }

      const query = `SELECT MAX(item_no) AS max_code FROM items WHERE category = '${category}'`;
      this.connection.query(query, (error, results) => {
        if (error) {
          callback(error, null);
          return;
        }

        let code = "0001";

        if (results[0].max_code) {
          const maxCode = results[0].max_code;
          const categoryLength = 4;
          const maxNumber = parseInt(maxCode.substr(-categoryLength), 10);

          const nextNumber = maxNumber + 1;
          code = nextNumber.toString().padStart(4, "0");
        }

        const itemCode = `${categoriesPrefix}-${code}`;
        callback(null, itemCode);
      });
    });
  }

  getCategoryPrefix(category, callback) {
    // Buat query untuk mengambil prefix kategori dari tabel kategori
    const query = `SELECT * FROM categories WHERE category = '${category}'`;
    this.connection.query(query, (error, results) => {
      if (error) {
        callback(error, "");
      } else {
        const prefix = results[0] ? `IT-${category}` : "gagal";
        callback(null, prefix);
      }
    });
  }

  updateItem(body, id, callback) {
    const SQLQuery = `UPDATE items 
    SET 
    item_description = ?, 
    unit = ?, 
    category = ?, 
    brand = ?, 
    status = ?, 
    kondisi = ?, 
    item_location = ?, 
    note = ?, 
    date_registation = ?, 
    date_expired = ?, 
    item_specification = ?, 
    post_user_id = ?, 
    post_username = ? 
    post_date = CURRENT_TIMESTAMP() 
    WHERE id = ?`;
    const values = [
      body.item_description,
      body.unit,
      body.category,
      body.brand,
      body.status,
      body.kondisi,
      body.item_location,
      body.note,
      body.date_registation,
      body.date_expired,
      body.item_specification,
      body.post_user_id,
      body.post_username,
      id,
    ];
    this.connection.query(SQLQuery, values, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  deleteItem(id, callback) {
    const SQLQuery = "DELETE FROM items WHERE id = ?";
    this.connection.query(SQLQuery, [id], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = Items;
