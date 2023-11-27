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

  // Metode untuk menambahkan kategori baru
  createPt(ptData, callback) {
    const query = "INSERT INTO pt (name_pt) VALUES ( ?)";
    this.connection.query(query, [ptData.name_pt], (error, result) => {
      callback(error, result);
    });
  }

  // Metode untuk mengambil kategori berdasarkan ID
  getPtById(ptId, callback) {
    const query = "SELECT * FROM pt WHERE id_pt = ?";
    this.connection.query(query, [ptId], (error, result) => {
      callback(error, result[0]); // Mengambil hasil pertama karena id adalah unik
    });
  }

  // Metode untuk mengupdate kategori berdasarkan ID
  updatePt(ptId, ptData, callback) {
    const query = "UPDATE pt SET name_pt = ? WHERE id_pt = ?";
    this.connection.query(query, [ptData.name_pt, ptId], (error, result) => {
      callback(error, result);
    });
  }

  // Metode untuk menghapus kategori berdasarkan ID
  deletePt(ptId, callback) {
    const query = "DELETE FROM pt WHERE id_pt = ?";
    this.connection.query(query, [ptId], (error, result) => {
      callback(error, result);
    });
  }

  getItemById(name_pt, callback) {
    const SQLQuery = `SELECT * FROM division WHERE name_pt = '${name_pt}';`;

    this.connection.query(SQLQuery, [name_pt], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length > 0) {
        callback(null, results);
      } else {
        callback(null, null);
      }
    });
  }

  // Metode untuk menambahkan kategori baru
  createDivision(ptData, callback) {
    const query = "INSERT INTO division (name_pt, name_division) VALUES (?, ?)";
    this.connection.query(
      query,
      [ptData.name_pt, ptData.name_division],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  checkDuplicateDivision(ptData, callback) {
    const query =
      "SELECT * FROM division WHERE name_pt = ? AND name_division = ?";
    this.connection.query(
      query,
      [ptData.name_pt, ptData.name_division],
      (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          // Jika ada hasil, berarti ada duplikasi
          const duplicate = result.length > 0;
          callback(null, duplicate);
        }
      }
    );
  }

  // Metode untuk mengambil kategori berdasarkan ID
  getDivisionById(divisionId, callback) {
    const query = "SELECT * FROM division WHERE id_division = ?";
    this.connection.query(query, [divisionId], (error, result) => {
      callback(error, result[0]);
    });
  }

  updateDivision(divisionId, divisionData, callback) {
    const query =
      "UPDATE division SET name_pt = ?, name_division = ? WHERE id_division = ?";
    this.connection.query(
      query,
      [divisionData.name_pt, divisionData.name_division, divisionId],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  deleteDivision(divisionId, callback) {
    const query = "DELETE FROM division WHERE id_division = ?";
    this.connection.query(query, [divisionId], (error, result) => {
      callback(error, result);
    });
  }
}

module.exports = DivisionAndPT;
