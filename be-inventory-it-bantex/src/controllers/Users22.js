// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users22");
const moment = require("moment-timezone");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const user = new User(dbConfig);

exports.register = (req, res) => {
  const { username, password, full_name, email, role } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    user.registerUser(
      { username, password: hash, full_name, email, role },
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Cari pengguna berdasarkan username
  user.getUserByUsername(username, (error, user) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Pengguna tidak ditemukan" });
    }

    // Bandingkan kata sandi yang diberikan dengan kata sandi yang disimpan dalam database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result) {
        // Kata sandi cocok, buat token JWT
        const token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        // return res.status(200).json({ message: "", token });
        return res.status(200).json({
          status: "success",
          message: "Otentikasi berhasil",
          data: {
            role: user.role,
            username: user.username,
            id_user: user.id_user,
            token: token,
          },
        });
      } else {
        return res.status(401).json({ message: "Kata sandi salah" });
      }
    });
  });
};

exports.deleteUser = (req, res) => {
  const { username } = req.params;

  user.deleteUser(username, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};

// Metode untuk mengedit data pengguna
exports.editUser = (req, res) => {
  const { id_user } = req.params;
  const { username, password, role } = req.body;

  // Hash the new password before storing it
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    user.editUser(
      id_user,
      { username, password: hash, role },
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: "User updated successfully" });
      }
    );
  });
};

exports.getAllUsers = (req, res) => {
  user.getAllUsers((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(results);
  });
};

exports.changePassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  user.getUserByUsername(username, (error, user) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Memeriksa kata sandi lama
    bcrypt.compare(oldPassword, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      if (result) {
        // Kata sandi lama cocok, lanjutkan dengan mengganti kata sandi baru
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          user.changePassword(username, hash, (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            res.status(200).json({ message: "Password changed successfully" });
          });
        });
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    });
  });
};

exports.getProfile = (req, res) => {
  const { username } = req.user;

  user.getUserByUsername(username, (error, userProfile) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id, username, role } = userProfile;
    res.status(200).json({ id, username, role });
  });
};

exports.recordLogin = (req, res) => {
  const { username } = req.body;

  user.recordLogin(username, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Login recorded successfully" });
  });
};

exports.getLastLogin = (req, res) => {
  const { username } = req.params;

  user.getLastLogin(username, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!result) {
      return res.status(404).json({ message: "No login history found" });
    }

    res.status(200).json(result);
  });
};

// Metode untuk mengambil history login semua users
exports.getAllLogins = (req, res) => {
  user.getAllLogins((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No login history found" });
    }

    res.status(200).json(results);
  });
};

// Mendapatkan data pengguna berdasarkan role
exports.getUserByRole = (req, res) => {
  const { role } = req.params;
  user.getUserByRole(role, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Pengguna Berdasarkan Role",
        data: results,
      });
    }
  });
};

// Metode untuk mengambil pengguna berdasarkan ID
exports.getUserByID = (req, res) => {
  const { id_user } = req.params;
  user.getUserByID(id_user, (error, userByID) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (userByID) {
      res.status(200).json(userByID);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

// Mendapatkan data pengguna dengan role 1 dan menampilkan kata sandi tanpa bcrypt
exports.getUserByRole1 = (req, res) => {
  user.getUserByRole1((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Pengguna Berdasarkan Role 1",
        data: results,
      });
    }
  });
};

// Mengambil daftar peran pengguna tanpa duplikasi
exports.getUniqueRoles = (req, res) => {
  user.getUniqueRoles((error, roles) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Daftar Peran Pengguna Tanpa Duplikasi",
        data: roles,
      });
    }
  });
};
