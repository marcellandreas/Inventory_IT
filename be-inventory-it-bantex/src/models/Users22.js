// models/user.js
const mysql = require("mysql2");

class User {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  registerUser(userData, callback) {
    const { username, password, role } = userData;

    // Generate user code based on role
    this.generateUserCode(role, (generateCodeError, code) => {
      if (generateCodeError) {
        callback(generateCodeError, null);
        return;
      }

      const query =
        "INSERT INTO user (username, password, role, code_user) VALUES (?, ?, ?, ?)";
      this.connection.query(
        query,
        [username, password, role, code],
        (error, results) => {
          callback(error, results);
        }
      );
    });
  }

  generateUserCode(role, callback) {
    const rolePrefix = role === 1 ? "ADMIN" : "USER";
    const query = `SELECT MAX(code_user) AS max_code FROM user WHERE role = ${role}`;
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

      const userCode = `${rolePrefix}-${code}`;
      callback(null, userCode);
    });
  }

  getUserByUsername(username, callback) {
    const query = "SELECT * FROM user WHERE username = ?";
    this.connection.query(query, [username], (error, results) => {
      callback(error, results[0]);
    });
  }

  // Metode untuk mengedit data pengguna berdasarkan id_user
  editUser(id_user, userData, callback) {
    const { username, password, role } = userData;
    const query =
      "UPDATE user SET username = ?, password = ?, role = ? WHERE id_user = ?";
    this.connection.query(
      query,
      [username, password, role, id_user],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk mendapatkan semua pengguna dengan informasi lengkap (termasuk kata sandi)
  getAllUsers(callback) {
    const query = "SELECT id_user, username, password, role FROM user";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  deleteUser(username, callback) {
    const query = "DELETE FROM user WHERE username = ?";
    this.connection.query(query, [username], (error, results) => {
      callback(error, results);
    });
  }

  changePassword(username, newPassword, callback) {
    const query = "UPDATE user SET password = ? WHERE username = ?";
    this.connection.query(query, [newPassword, username], (error, results) => {
      if (error) {
        console.error(error); // Tambahkan ini untuk debugging
      }
      callback(error, results);
    });
  }

  recordLogin(username, callback) {
    const timestamp = new Date().toISOString();
    const query =
      "INSERT INTO login_history (username, login_time) VALUES (?, ?)";
    this.connection.query(query, [username, timestamp], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mendapatkan siapa yang terakhir kali login
  getLastLogin(username, callback) {
    const query =
      "SELECT username, MAX(login_time) as last_login FROM login_history WHERE username = ? GROUP BY username";
    this.connection.query(query, [username], (error, results) => {
      callback(error, results[0]);
    });
  }
  // Metode untuk mendapatkan data semua pengguna yang pernah login
  getAllLogins(callback) {
    const query =
      "SELECT username, MAX(login_time) as last_login FROM login_history GROUP BY username";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil pengguna berdasarkan ID
  getUserByID(id_user, callback) {
    const query = "SELECT id_user, username, role FROM user WHERE id_user = ?";
    this.connection.query(query, [id_user], (error, results) => {
      if (results.length > 0) {
        callback(error, results[0]);
      } else {
        callback(error, null);
      }
    });
  }
}

module.exports = User;
