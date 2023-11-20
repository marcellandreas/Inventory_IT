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

  getPersonalComputer(userId, callback) {
    const query = `
    SELECT 
    pc_master.pc_no, 
    pc_master.pc_description, 
    pc_master.unit, 
    pc_master.category, 
    pc_master.status, 
    pc_master.pc_location, 
    pc_master.note, 
    pc_master.date_registation, 
    pc_master.date_expired,
    pc_master.pc_spectification,
    pc_master.post_user_id,
    pc_master.post_username,
    pc_master.post_date,
    GROUP_CONCAT(pc_linee.item_no) AS item_no, 
    GROUP_CONCAT(pc_linee.post_date) AS post_date,
    GROUP_CONCAT(items.item_description) AS item_description,
    GROUP_CONCAT(items.unit) AS item_unit,
    GROUP_CONCAT(items.brand) AS item_brand,
    GROUP_CONCAT(items.category) AS item_category,
    GROUP_CONCAT(items.status) AS item_status,
    GROUP_CONCAT(items.kondisi) AS item_kondisi,
    GROUP_CONCAT(items.item_location) AS item_location,
    GROUP_CONCAT(items.note) AS item_note,
    GROUP_CONCAT(items.date_registation) AS item_registation,
    GROUP_CONCAT(items.date_expired) AS item_expired,
    GROUP_CONCAT(items.item_specification) AS item_spesification,
    GROUP_CONCAT(items.post_user_id) AS item_user_id,
    GROUP_CONCAT(items.post_username) AS item_username,
    GROUP_CONCAT(items.post_date) AS item_date
FROM pc_master
LEFT JOIN pc_linee ON pc_master.pc_no = pc_linee.pc_no
LEFT JOIN items ON pc_linee.item_no = items.item_no
WHERE pc_master.post_user_id = ?
GROUP BY pc_master.post_username;
    `;

    this.connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        callback(error, null);
      } else {
        console.log("Query results:", results);

        if (results && results.length > 0) {
          callback(null, results);
        } else {
          console.log("No data found for user ID:", userId);
          callback(null, []); // Return an empty array if no data is found
        }
      }
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
