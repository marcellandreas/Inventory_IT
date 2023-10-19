// models/formRequest.js
const mysql = require("mysql2");

class FormRequest {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk mengambil semua data form request
  getAllData(callback) {
    const query = "SELECT * FROM items_request";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk membuat form request baru
  createFormRequest(data, callback) {
    const query =
      "INSERT INTO items_request (no_pengajuan, name_pt, name_division, item_req_date, applicant, approved_1, approved_2, status, post_username, post_user_id, post_created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    this.connection.query(
      query,
      [
        data.no_pengajuan,
        data.name_pt,
        data.name_division,
        data.item_req_date,
        data.applicant,
        data.approved_1,
        data.approved_2,
        data.status,
        data.post_username,
        data.post_user_id,
        data.post_created_at,
      ],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk mengupdate form request
  updateFormRequest(id_item_req, data, callback) {
    const query =
      "UPDATE items_request SET no_pengajuan=?, name_pt=?, name_division=?, item_req_date=?, applicant=?, approved_1=?, approved_2=?, status=?, post_username=?, post_user_id=?, post_created_at=? WHERE id_item_req=?";
    this.connection.query(
      query,
      [
        data.no_pengajuan,
        data.name_pt,
        data.name_division,
        data.item_req_date,
        data.applicant,
        data.approved_1,
        data.approved_2,
        data.status,
        data.post_username,
        data.post_user_id,
        data.post_created_at,
        id_item_req,
      ],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk menghapus form request berdasarkan ID
  deleteFormRequest(id_item_req, callback) {
    const query = "DELETE FROM items_request WHERE id_item_req=?";
    this.connection.query(query, [id_item_req], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan no_pengajuan
  getByNoPengajuan(no_pengajuan, callback) {
    const query = "SELECT * FROM items_request WHERE no_pengajuan=?";
    this.connection.query(query, [no_pengajuan], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengupdate status form request berdasarkan ID
  updateStatus(id_item_req, status, callback) {
    const query = "UPDATE items_request SET status=? WHERE id_item_req=?";
    this.connection.query(query, [status, id_item_req], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan status dan username
  getByStatusAndUsername(status, post_username, callback) {
    const query =
      "SELECT * FROM items_request WHERE status=? AND post_username=?";
    this.connection.query(query, [status, post_username], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan status dan approved_1
  getByStatusAndApproved1(status, approved_1, callback) {
    const query = "SELECT * FROM items_request WHERE status=? AND approved_1=?";
    this.connection.query(query, [status, approved_1], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan status dan approved_2
  getByStatusAndApproved2(status, approved_2, callback) {
    const query = "SELECT * FROM items_request WHERE status=? AND approved_2=?";
    this.connection.query(query, [status, approved_2], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan post_username
  getDatabyPostUsername(post_username, callback) {
    const query = "SELECT * FROM items_request WHERE post_username=?";
    this.connection.query(query, [post_username], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan approved_1
  getDatabyApproved1(approved_1, callback) {
    const query = "SELECT * FROM form_request WHERE approved_1=?";
    this.connection.query(query, [approved_1], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan approved_2
  getDatabyApproved2(approved_2, callback) {
    const query = "SELECT * FROM form_request WHERE approved_2=?";
    this.connection.query(query, [approved_2], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data items request berdasarkan kriteria tertentu
  getDataByCriteria(status, post_username, approved_1, approved_2, callback) {
    const query =
      "SELECT * FROM items_request WHERE status = ? OR post_username = ? OR approved_1 = ? OR approved_2 = ?";
    this.connection.query(
      query,
      [status, post_username, approved_1, approved_2],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Membuat metode untuk mengubah status dan tanggal approved saat disetujui oleh approved_1
  approveFormRequest(idItemReq, status, tglApproved1, callback) {
    const query =
      "UPDATE items_request SET status = ?, date_approved_1 = ? WHERE id_item_req = ?";
    this.connection.query(
      query,
      [status, tglApproved1, idItemReq],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  // Membuat metode untuk mengubah status dan tanggal approved saat disetujui oleh approved_2
  approveFormRequest2(idItemReq, status, tglApproved2, callback) {
    const query =
      "UPDATE items_request SET status = ?, date_approved_2 = ? WHERE id_item_req = ?";
    this.connection.query(
      query,
      [status, tglApproved2, idItemReq],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  // Membuat metode untuk mengubah status dan tanggal approved saat disetujui oleh approved_1
  finishFormRequest(idItemReq, status, tglDone, callback) {
    const query =
      "UPDATE items_request SET status = ?, date_done = ? WHERE id_item_req = ?";
    this.connection.query(
      query,
      [status, tglDone, idItemReq],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  // Membuat metode untuk menghapus tanggal approved saat ditolak
  rejectFormRequest(idItemReq, callback) {
    const query =
      "UPDATE items_request SET status = ?, date_approved_1 = NULL, date_approved_2 = NULL WHERE id_item_req = ?";
    this.connection.query(query, ["Ditolak", idItemReq], (error, result) => {
      callback(error, result);
    });
  }
  // Membuat metode untuk mengambil data yang membutuhkan persetujuan approved_1
  getFormRequestRequiringApproval1(approved1, callback) {
    const query =
      "SELECT * FROM form_request WHERE approved_1 = ? AND approved_2 IS NULL";
    this.connection.query(query, [approved1], (error, results) => {
      callback(error, results);
    });
  }

  // Membuat metode untuk mengambil data yang membutuhkan persetujuan approved_2
  getFormRequestRequiringApproval2(approved2, callback) {
    const query =
      "SELECT * FROM form_request WHERE approved_1 IS NOT NULL AND approved_2 = ?";
    this.connection.query(query, [approved2], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = FormRequest;
