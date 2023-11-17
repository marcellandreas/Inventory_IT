const mysql = require("mysql2");

class DivisionAndPT {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  getAllDataPt(callback) {
    const SQLQuery = "SELECT * FROM pt";
    this.connection.query(SQLQuery, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }
  getItemById(name_pt, callback) {
    const SQLQuery = `SELECT * FROM division WHERE name_pt = '${name_pt}';`;

    this.connection.query(SQLQuery, [name_pt], (error, results) => {
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
}

// const deleteItem = (id) => {
//   const SQLQuery = `DELETE FROM items WHERE id = ${id}`;
//   return pool.execute(SQLQuery);
// };

// module.exports = {
//   getAllDataPt,
//   getDivisionByNamePt,
// };

module.exports = DivisionAndPT;
