const mysql = require("mysql2");

class CreatePengajuan {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  createPengajuan(
    name_pt,
    name_division,
    approved_1,
    approved_2,
    post_user_id,
    post_username,
    request_type,
    callback
  ) {
    this.generatePengajuanCode((generateCodeError, code) => {
      if (generateCodeError) {
        callback(generateCodeError, null);
      } else {
        this.connection.query(
          "INSERT INTO request_submission (no_pengajuan, name_pt, name_division, approved_1, approved_2, post_user_id, post_username, request_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            code,
            name_pt,
            name_division,
            approved_1,
            approved_2,
            post_user_id,
            post_username,
            request_type,
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

  generatePengajuanCode(callback) {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

    const rolePrefix = `IT-${year}-${month}-`;
    const query =
      "SELECT MAX(no_pengajuan) AS max_pengajuan FROM request_submission";
    this.connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }

      let code = "001";

      if (results[0].max_pengajuan) {
        const maxCode = results[0].max_pengajuan;
        const lastYearMonth = maxCode.substr(3, 7);

        if (lastYearMonth === `${year}-${month}`) {
          const maxNumber = parseInt(maxCode.substr(11), 10);
          const nextNumber = (maxNumber + 1) % 1000;
          code = nextNumber.toString().padStart(3, "0");
        }
        // Jika bulan berganti, kembalikan ke 001
      }

      const pengajuanCode = `${rolePrefix}${code}`;
      callback(null, pengajuanCode);
    });
  }
}

module.exports = CreatePengajuan;
