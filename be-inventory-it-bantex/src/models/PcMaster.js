const mysql = require("mysql2");

class PcMaster {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  getAllPcMaster(callback) {
    this.connection.query("SELECT * FROM pc_master", (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  getPcMasterById(id, callback) {
    this.connection.query(
      "SELECT * FROM pc_master WHERE id_pc_master = ?",
      [id],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, result[0]);
      }
    );
  }

  getPcMasterByPcMaster(pcno, callback) {
    this.connection.query(
      "SELECT * FROM pc_master WHERE pc_no = ?",
      [pcno],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, result);
      }
    );
  }

  createPcMaster(body, callback) {
    this.generatePcCode(body.category, (generateCodeError, code) => {
      if (generateCodeError) {
        callback(generateCodeError, null);
      } else {
        this.connection.query(
          "INSERT INTO pc_master (pc_no, pc_description, unit, category, status, pc_location, note, date_registation, date_expired, pc_spectification, post_user_id, post_username, post_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp())",
          [
            code,
            body.pc_description,
            body.unit,
            body.category,
            body.status,
            body.pc_location,
            body.note,
            body.date_registation,
            body.date_expired,
            body.pc_spectification,
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

  generatePcCode(category, callback) {
    const categoriesPrefix =
      category === "PC"
        ? "IT-PC"
        : category === "LAPTOP"
        ? "IT-LAPTOP"
        : "IT-LAINNYA";
    const query = `SELECT MAX(pc_no) AS max_code FROM pc_master WHERE category = '${category}'`;
    this.connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }

      let code = "0001";

      if (results[0].max_code) {
        const maxCode = results[0].max_code;
        const maxNumber = parseInt(maxCode.substr(6), 10);
        const nextNumber = maxNumber + 1;
        code = nextNumber.toString().padStart(4, "0");
      }

      const pcCode = `${categoriesPrefix}-${code}`;
      callback(null, pcCode);
    });
  }

  updatePcMaster(body, id, callback) {
    this.connection.query(
      "UPDATE pc_master SET  pc_description = ?, unit = ?, category = ?, status = ?, pc_location = ?, note = ?, date_registation = ?, date_expired = ?, pc_spectification = ?, post_user_id = ?, post_username = ? WHERE id_pc_master = ?",
      [
        body.pc_description,
        body.unit,
        body.category,
        body.status,
        body.pc_location,
        body.note,
        body.date_registation,
        body.date_expired,
        body.pc_spectification,
        body.post_user_id,
        body.post_username,
        id,
      ],
      (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, "Pc master updated successfully");
        }
      }
    );
  }

  deletePcMaster(id, callback) {
    this.connection.query(
      "DELETE FROM pc_master WHERE id_pc_master = ?",
      [id],
      (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, "Pc master deleted successfully");
        }
      }
    );
  }

  // Implement other methods like updatePcMaster and deletePcMaster

  // Add the generatePcCode method if it's not already defined in your code
}

module.exports = PcMaster;
