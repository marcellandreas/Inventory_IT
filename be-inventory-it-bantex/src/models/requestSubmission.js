// models/formRequest.js
const mysql = require("mysql2");

class requestSubmission {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  // Metode untuk mengambil semua data form request
  getAllData(callback) {
    const query = "SELECT * FROM request_submission";
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }
  getDataPostDateNew(callback) {
    const query = `SELECT * FROM request_submission
    ORDER BY post_date DESC
    LIMIT 7;
    `;
    this.connection.query(query, (error, results) => {
      callback(error, results);
    });
  }

  getReqSubById(id, callback) {
    this.connection.query(
      "SELECT * FROM request_submission WHERE id_req_sub = ?",
      [id],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        if (results.length > 0) {
          callback(null, results[0]);
        } else {
          callback(null, null);
        }
      }
    );
  }

  getReqSubById2(idItemReq) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM request_submission WHERE id_req_sub = ?";
      this.connection.query(query, [idItemReq], (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Mengembalikan data pengajuan jika ditemukan
          resolve(results[0]);
        }
      });
    });
  }

  // Metode untuk mengupdate form request
  updateFormRequest(id_req_sub, data, callback) {
    const query =
      "UPDATE request_submission SET name_pt=?, name_division=?, item_req_date=?, applicant=?, approved_1=?, approved_2=?, status=?, post_username=?, post_user_id=?, post_created_at=? WHERE id_req_sub=?";
    this.connection.query(
      query,
      [
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
        id_req_sub,
      ],
      (error, results) => {
        callback(error, results);
      }
    );
  }

  // Metode untuk menghapus form request berdasarkan ID
  deleteFormRequest(id_req_sub, callback) {
    const query = "DELETE FROM request_submission WHERE id_req_sub=?";
    this.connection.query(query, [id_req_sub], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan no_pengajuan
  getByNoPengajuan(no_pengajuan, callback) {
    const query = "SELECT * FROM request_submission WHERE no_pengajuan=?";
    this.connection.query(query, [no_pengajuan], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengupdate status form request berdasarkan ID
  updateStatus(id_req_sub, status, callback) {
    const query = "UPDATE request_submission SET status=? WHERE id_req_sub=?";
    this.connection.query(query, [status, id_req_sub], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan status dan username
  getByStatusAndUsername(status, post_username, callback) {
    const query =
      "SELECT * FROM request_submission WHERE status=? AND post_username=?";
    this.connection.query(query, [status, post_username], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan status dan approved_1
  getByStatusAndApproved1(status, approved_1, callback) {
    const query =
      "SELECT * FROM request_submission WHERE status=? AND approved_1=?";
    this.connection.query(query, [status, approved_1], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan status dan approved_2
  getByStatusAndApproved2(status, approved_2, callback) {
    const query =
      "SELECT * FROM request_submission WHERE status=? AND approved_2=?";
    this.connection.query(query, [status, approved_2], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan post_username
  getDatabyPostUsername(post_username, callback) {
    const query = "SELECT * FROM request_submission WHERE post_username=?";
    this.connection.query(query, [post_username], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan approved_1
  getDatabyApproved1(approved_1, callback) {
    const query = "SELECT * FROM request_submission WHERE approved_1=?";
    this.connection.query(query, [approved_1], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data form request berdasarkan approved_2
  getDatabyApproved2(approved_2, callback) {
    const query = "SELECT * FROM request_submission WHERE approved_2=?";
    this.connection.query(query, [approved_2], (error, results) => {
      callback(error, results);
    });
  }

  // Metode untuk mengambil data items request berdasarkan kriteria tertentu
  getDataByCriteria(status, post_username, approved_1, approved_2, callback) {
    const query =
      "SELECT * FROM request_submission WHERE status = ? OR post_username = ? OR approved_1 = ? OR approved_2 = ?";
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
      "UPDATE request_submission SET status = ?, date_approved_1 = ? WHERE id_req_sub = ?";
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
      "UPDATE request_submission SET status = ?, date_approved_2 = ? WHERE id_req_sub = ?";
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
      "UPDATE request_submission SET status = ?, date_done = ? WHERE id_req_sub = ?";
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
      "UPDATE request_submission SET status = ?, date_approved_1 = NULL, date_approved_2 = NULL, date_done = NULL WHERE id_req_sub = ?";
    this.connection.query(query, ["Ditolak", idItemReq], (error, result) => {
      callback(error, result);
    });
  }
  // Membuat metode untuk mengambil data yang membutuhkan persetujuan approved_1
  getFormRequestRequiringApproval1(approved1, callback) {
    const query =
      "SELECT * FROM request_submission WHERE approved_1 = ? AND approved_2 IS NULL";
    this.connection.query(query, [approved1], (error, results) => {
      callback(error, results);
    });
  }

  // Membuat metode untuk mengambil data yang membutuhkan persetujuan approved_2
  getFormRequestRequiringApproval2(approved2, callback) {
    const query =
      "SELECT * FROM request_submission WHERE approved_1 IS NOT NULL AND approved_2 = ?";
    this.connection.query(query, [approved2], (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = requestSubmission;
