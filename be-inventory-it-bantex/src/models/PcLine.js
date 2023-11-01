const mysql = require("mysql2");

class PcLine {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  getAllPcLine(callback) {
    const SQLQuery = `
      SELECT p.*, p.pc_no, i.item_no, i.item_description, i.unit, i.brand, i.note, i.date_registation, i.item_specification
      FROM pc_linee p
      INNER JOIN items i ON p.item_no = i.item_no
    `;
    this.connection.query(SQLQuery, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  getDataPcLineByPcNo(pcno, callback) {
    const SQLQuery = `
      SELECT p.*, i.item_no, i.item_description, i.unit, i.brand, i.note, i.date_registation, i.item_specification
      FROM pc_linee p
      INNER JOIN items i ON p.item_no = i.item_no
      WHERE p.pc_no = ?
    `;
    this.connection.query(SQLQuery, [pcno], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  createPcLine(values, callback) {
    const placeholders = values
      .map(() => "(?, ?, ?, ?, current_timestamp())")
      .join(", ");
    const SQLQuery = `INSERT INTO pc_linee (pc_no, item_no, post_user_id, post_username, post_date) VALUES ${placeholders}`;
    const flattenedValues = values.reduce(
      (acc, value) =>
        acc.concat([
          value.pc_no,
          value.item_no,
          value.post_user_id,
          value.post_username,
        ]),
      []
    );
    this.connection.query(SQLQuery, flattenedValues, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  deletePcLines(item_nos, callback) {
    const itemNosString = item_nos.map((item_no) => `'${item_no}'`).join(",");
    const SQLQuery = `DELETE FROM pc_linee WHERE pc_linee.item_no IN (${itemNosString})`;
    this.connection.query(SQLQuery, (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = PcLine;
