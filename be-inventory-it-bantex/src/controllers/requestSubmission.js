const requestSubmissionModels = require("../models/requestSubmission");
const userModels = require("../models/requestSubmission");
const AuthModels = require("../models/AuthModel");
const CreateModel = require("../models/CreatePengajuan");
const STOCK_MODEL = require("../models/Stocks");
const { showFormattedDate } = require("../helpers/formatData");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};
const nodemailer = require("nodemailer");

const { sendErrorRes, sendSuccessRes } = require("../helpers/response");

const requestSubmission = new requestSubmissionModels(dbConfig);
const userFix = new userModels(dbConfig);
const authFix = new AuthModels(dbConfig);
const createFix = new CreateModel(dbConfig);
const stockFix = new STOCK_MODEL(dbConfig);

exports.getAllData = (req, res) => {
  requestSubmission.getAllData((error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Mengambil Data Pengajuan", error);
    } else if (results && results.length > 0) {
      sendSuccessRes(res, 200, "Berhasil Mengambil Data Pengajuan", results);
    } else {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    }
  });
};

exports.getDataPostDateNew = (req, res) => {
  requestSubmission.getDataPostDateNew((error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Mengambil Data Pengajuan", error);
    } else if (results && results.length > 0) {
      sendSuccessRes(res, 200, `Berhasil Mengambil Data Pengajuan`, results);
    } else {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    }
  });
};

exports.getReqSubById = (req, res) => {
  const { id } = req.params;
  requestSubmission.getReqSubById(id, (error, data) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Mengambil Data Pengajuan ID", error);
    } else if (!data) {
      sendSuccessRes(res, 404, `Tidak Menemukan Data id :${id}`);
    } else {
      res.status(200).json({ data });
    }
  });
};

// Mengupdate form request
exports.updateFormRequest = (req, res) => {
  const id_item_req = req.params.id_item_req;
  const formData = req.body;
  requestSubmission.updateFormRequest(
    id_item_req,
    formData,
    (error, results) => {
      if (error) {
        sendErrorRes(res, 500, "Gagal Update Data Pengajuan", error);
      } else {
        res
          .status(200)
          .json({ message: "Form Request berhasil diupdate", data: results });
      }
    }
  );
};

// Menghapus form request
exports.deleteFormRequest = (req, res) => {
  const { id_item_req } = req.params;
  requestSubmission.deleteFormRequest(id_item_req, (error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Delete Data Pengajuan", error);
    } else if (results.affectedRows > 0) {
      sendSuccessRes(res, 200, `Berhasil Menghapus Data Pengajuan`, results);
    } else {
      sendSuccessRes(res, 404, `Tidak Menemukan Data id :${id_item_req}`);
    }
  });
};

// Mendapatkan data form request berdasarkan no_pengajuan
exports.getByNoPengajuan = (req, res) => {
  const { no_pengajuan } = req.params;
  requestSubmission.getByNoPengajuan(no_pengajuan, (error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else if (results && results.length > 0) {
      res.status(200).json({
        message: "Berhasil Mengambil Data Form Request",
        data: results,
      });
    } else {
      sendSuccessRes(res, 404, `Tidak Menemukan Data no :${no_pengajuan}`);
    }
  });
};

// Mengupdate status form request
exports.updateStatus = (req, res) => {
  const id_item_req = req.params.id_item_req;
  const status = req.body.status;
  requestSubmission.updateStatus(id_item_req, status, (error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      res.status(200).json({
        message: "Status Form Request berhasil diupdate",
        data: results,
      });
    }
  });
};

// Mendapatkan data form request berdasarkan status dan post username
exports.getByStatusAndUsername = (req, res) => {
  const status = req.params.status;
  const post_username = req.params.post_username;
  requestSubmission.getByStatusAndUsername(
    status,
    post_username,
    (error, results) => {
      if (error) {
        sendErrorRes(res, 500, "Server Error", error);
      } else if (results && results.length > 0) {
        sendSuccessRes(res, 200, `Berhasil Mengamnil Data Pengajuan`, results);
      } else {
        sendSuccessRes(res, 404, "Tidak Menemukan Data");
      }
    }
  );
};
// Mendapatkan data form request berdasarkan status dan approved_1
exports.getByStatusAndApproved1 = (req, res) => {
  const status = req.params.status;
  const approved_1 = req.params.approved_1;
  requestSubmission.getByStatusAndApproved1(
    status,
    approved_1,
    (error, results) => {
      if (error) {
        sendErrorRes(res, 500, "Server Error", error);
      } else if (results && results.length > 0) {
        sendSuccessRes(res, 200, `Berhasil Mengamnil Data Pengajuan`, results);
      } else {
        sendSuccessRes(res, 404, "Tidak Menemukan Data");
      }
    }
  );
};

// Mendapatkan data form request berdasarkan status dan approved_2
exports.getByStatusAndApproved2 = (req, res) => {
  const status = req.params.status;
  const approved_2 = req.params.approved_2;
  requestSubmission.getByStatusAndApproved2(
    status,
    approved_2,
    (error, results) => {
      if (error) {
        sendErrorRes(res, 500, "Server Error", error);
      } else if (results && results.length > 0) {
        sendSuccessRes(res, 200, `Berhasil Mengamnil Data Pengajuan`, results);
      } else {
        sendSuccessRes(
          res,
          404,
          `Tidak Menemukan Data Status ${status} dan Approved 2 ${approved_2}`
        );
      }
    }
  );
};

// Mendapatkan data form request berdasarkan post_username
exports.getDataByPostUsername = (req, res) => {
  const post_username = req.params.post_username;
  requestSubmission.getDatabyPostUsername(post_username, (error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else if (results && results.length > 0) {
      sendSuccessRes(res, 200, `Berhasil Mengamnil Data Pengajuan`, results);
    } else {
      sendSuccessRes(res, 404, `Tidak Menemukan Data ${post_username}`);
    }
  });
};

// Mendapatkan data items request berdasarkan kriteria tertentu
exports.getDataByCriteria = (req, res) => {
  const { status, post_username, approved_1, approved_2 } = req.query;
  requestSubmission.getDataByCriteria(
    status,
    post_username,
    approved_1,
    approved_2,
    (error, results) => {
      if (error) {
        sendErrorRes(res, 500, "Server Error", error);
      } else if (results && results.length > 0) {
        sendSuccessRes(res, 200, `Berhasil Mengamnil Data Pengajuan`, results);
      } else {
        sendSuccessRes(res, 404, `Tidak Menemukan Data`);
      }
    }
  );
};

const sendEmail = async (idItemReq, templateType) => {
  try {
    const dataPengajuan = await userFix.getReqSubById2(idItemReq);
    if (!dataPengajuan) {
      console.error("Pengajuan not found for idItemReq:", idItemReq);
      return;
    }

    const { request_type, no_pengajuan } = dataPengajuan;
    const dataBarang = await createFix.getDataBarangByTypeRequest(
      request_type,
      no_pengajuan
    );
    console.log("Data Barang:", dataBarang);

    console.log("Sending email to user:", dataPengajuan);

    const manager = await authFix.getUserByUsername2(dataPengajuan.approved_2);
    const admin = await authFix.getUserByUsername2(dataPengajuan.approved_1);
    const user = await authFix.getUserByUsername2(dataPengajuan.post_username);
    const managerEmail = manager ? manager.email : null;
    const managerName = manager ? manager.name_full : null;
    const userEmail = user ? user.email : null;
    const userName = user ? user.full_name : null;
    const adminEmail = admin ? admin.email : null;
    const adminName = admin ? admin.full_name : null;

    if (!userEmail) {
      console.error(
        "User email not found for username:",
        dataPengajuan.post_username
      );
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const { stock_no, stock_description, qty, additional_info, note } =
      dataBarang[0];

    let subject;
    let text;

    switch (templateType) {
      case "admin_approval":
        subject = `Pengajuan Barang IT Bantex Indonesia - Disetujui oleh Admin: ${adminName}`;
        text = `Dear mr/mrs ${userName}

        Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${userName} pada divisi ${
          dataPengajuan.name_division
        } atas barang  ${stock_description} pada tanggal ${showFormattedDate(
          dataPengajuan.post_date
        )} telah disetujui oleh Bagian IT ${adminName},
        
        Detail Pengajuan:
        - Nomor: ${no_pengajuan}
        - Stock No: ${stock_no}
        - Nama PT: ${dataPengajuan.name_pt}
        - Nama Division: ${dataPengajuan.name_division}
        - Deskripsi Barang: ${stock_description}
        - Jumlah: ${qty}
        ${note ? `- Note: ${note}` : ""}
        ${additional_info ? `- Tambahan: ${additional_info}` : ""}

        Terima kasih telah menggunakan layanan kami.
        Best Regards 
        System Administrator
        `;
        break;
      case "managers_approval":
        subject = `Pengajuan Barang IT Bantex Indonesia - Disetujui oleh Manager ${managerName}`;
        text = `
        Dear mr/mrs ${userName}

        Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${userName} atas barang  ${stock_description} pada tanggal ${showFormattedDate(
          dataPengajuan.post_date
        )} telah disetujui oleh manager ${managerName},
        
        Detail Pengajuan:
        Nomor Pengajuan: ${no_pengajuan}
        Dibuat oleh: ${userEmail}
        Detail Pengajuan:
        - Nomor: ${no_pengajuan}
        - Stock No: ${stock_no}
        - Nama PT: ${dataPengajuan.name_pt}
        - Nama Division: ${dataPengajuan.name_division}
        - Deskripsi Barang: ${stock_description}
        - Jumlah: ${qty}
        ${note ? `- Note: ${note}` : ""}
        ${additional_info ? `- Tambahan: ${additional_info}` : ""}
        
        Pengajuan sudah selesai harap menunggu barang, "ketika barang tiba segera klik Selesai"

        Terima kasih telah menggunakan layanan kami.
        Best Regards 
        System Administrator
        `;
        break;
      case "rejection":
        subject = "Pengajuan Barang IT Bantex Indonesia - Ditolak";
        text = `
        Dear mr/mrs ${userName}

      Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${userName} atas barang  ${stock_description} pada tanggal ${showFormattedDate(
          dataPengajuan.post_date
        )} telah ditolak oleh Bagian IT ${adminName} / manager ${managerName},

        Detail Pengajuan:
        - Nomor: ${no_pengajuan}
        - Stock No: ${stock_no}
        - Nama PT: ${dataPengajuan.name_pt}
        - Nama Division: ${dataPengajuan.name_division}
        - Deskripsi Barang: ${stock_description}
        - Jumlah: ${qty}
        ${note ? `- Note: ${note}` : ""}
        ${additional_info ? `- Tambahan: ${additional_info}` : ""}
        
        Terima kasih telah menggunakan layanan kami.
        Best Regards 
        System Administrator
        `;
        break;
      default:
        console.error("Invalid template type:", templateType);
        return;
    }

    const mailOptions = {
      from: "marcellandreasduha@gmail.com",
      to: userEmail,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email to user sent:", info.response);
  } catch (error) {
    console.error("Error sending email to user:", error);
  }
};

const sendEmailToManagers = async (idItemReq) => {
  try {
    const dataPengajuan = await userFix.getReqSubById2(idItemReq);

    if (!dataPengajuan) {
      console.error("Pengajuan not found for idItemReq:", idItemReq);
      return;
    }

    const dataBarang = await createFix.getDataBarangByTypeRequest(
      dataPengajuan.request_type,
      dataPengajuan.no_pengajuan
    );

    const stocks = await stockFix.getStockByStockNo2(dataBarang[0].stock_no);
    const stockDescription = console.log("mendapatkan stocks nya ", stocks);
    const admin = await authFix.getUserByUsername2(dataPengajuan.approved_1);
    const manager = await authFix.getUserByUsername2(dataPengajuan.approved_2);
    const user = await authFix.getUserByUsername2(dataPengajuan.post_username);
    const managerEmail = manager ? manager.email : null;
    console.log("manager", manager);
    const managerName = manager ? manager.full_name : null;
    const userEmail = user ? user.email : null;
    const userName = user ? user.full_name : null;
    const adminEmail = admin ? admin.email : null;
    const adminName = admin ? admin.full_name : null;

    console.log("admin full name", adminName);
    console.log("manager name", managerName);
    if (!managerEmail) {
      console.error(
        "Manager email not found for username:",
        dataPengajuan.approved_2
      );
      return;
    }

    const no_pengajuan = dataPengajuan.no_pengajuan;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log("data barang ", dataBarang);
    const { stock_no, stock_description, qty, additional_info, note } =
      dataBarang[0];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: managerEmail,
      cc: adminEmail,
      subject: `Pengajuan Barang IT - pengaju ${userName} `,
      text: `
      Dear mr/mrs ${managerName}


      Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${userName} atas barang  ${stock_description} pada tanggal ${showFormattedDate(
        dataPengajuan.post_approved_1
      )} telah disetujui oleh Bagian IT,
      
      Detail Pengajuan: 
      No: ${dataPengajuan.no_pengajuan},
      Stock No: ${stock_no}, 
      nama pt: ${dataPengajuan.name_pt}, 
      nama division: ${dataPengajuan.name_division}, 
      Deskripsi Barang :${stocks.stock_description} - ${stock_description} 
      jumlah: ${qty} 
      ${note ? ` note: ${note}` : ""}
      ${additional_info ? ` Tambahan: ${additional_info}` : ""}
  
      Terima kasih telah menggunakan layanan kami.
      Best Regards 
      System Administrator
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email to manager sent:", info.response);
  } catch (error) {
    console.error("Error sending email to manager:", error);
  }
};

exports.approveFormRequest1 = async (req, res) => {
  try {
    const { idItemReq } = req.params;

    const status = "Disetujui1";
    const tglApproved1 = new Date();

    const result = await new Promise((resolve, reject) => {
      requestSubmission.approveFormRequest(
        idItemReq,
        status,
        tglApproved1,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (result.affectedRows > 0) {
      sendSuccessRes(res, 200, `Status Berhasil diubah`);
      const emailResult = sendEmail(idItemReq, "admin_approval");
      if (emailResult) {
        await sendEmailToManagers(idItemReq);
      } else {
      }
    } else {
      sendSuccessRes(res, 404, `Tidak Menemukan Id ${idItemReq}`);
    }
  } catch (error) {
    sendErrorRes(res, 500, "Server Error", error);
  }
};

// Mengubah status dan tanggal approved saat disetujui oleh approved_2
exports.approveFormRequest2 = (req, res) => {
  const { idItemReq } = req.params;

  // Set status dan tanggal yang sesuai
  const status = "Disetujui2";
  const tglApproved2 = new Date();

  requestSubmission.approveFormRequest2(
    idItemReq,
    status,
    tglApproved2,
    (error, result) => {
      if (error) {
        sendErrorRes(res, 500, "Server Error", error);
      } else {
        if (result.affectedRows > 0) {
          sendSuccessRes(res, 200, `Status Berhasil diubah`);

          sendEmail(idItemReq, "managers_approval");
        } else {
          sendSuccessRes(res, 404, `Tidak Menemukan Id ${idItemReq}`);
        }
      }
    }
  );
};

// Menghapus tanggal approved saat status ditolak
exports.rejectFormRequest = (req, res) => {
  const { idItemReq } = req.params;

  requestSubmission.rejectFormRequest(idItemReq, (error, result) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      if (result.affectedRows > 0) {
        sendSuccessRes(res, 200, `Status Berhasil diubah`);
        sendEmail(idItemReq, "rejection");
      } else {
        sendSuccessRes(res, 404, `Tidak Menemukan Id ${idItemReq}`);
      }
    }
  });
};

// Mengubah status dan tanggal approved saat disetujui oleh post_usernam (selesai)
exports.finishFormRequest = (req, res) => {
  const { idItemReq } = req.params;

  // Set status dan tanggal yang sesuai
  const status = "Selesai";
  const tglDone = new Date();

  requestSubmission.finishFormRequest(
    idItemReq,
    status,
    tglDone,
    (error, result) => {
      if (error) {
        sendErrorRes(res, 500, "Server Error", error);
      } else {
        if (result.affectedRows > 0) {
          sendSuccessRes(res, 200, `Status Berhasil diubah`);
        } else {
          sendSuccessRes(res, 404, `Tidak Menemukan Id ${idItemReq}`);
        }
      }
    }
  );
};
