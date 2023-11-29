const requestSubmissionModels = require("../models/requestSubmission");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const { sendErrorRes, sendSuccessRes } = require("../helpers/response");

const requestSubmission = new requestSubmissionModels(dbConfig);

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

// Mengubah status dan tanggal approved saat disetujui oleh approved_1
exports.approveFormRequest1 = (req, res) => {
  const { idItemReq } = req.params;

  // Set status dan tanggal yang sesuai
  const status = "Disetujui1";
  const tglApproved1 = new Date();

  requestSubmission.approveFormRequest(
    idItemReq,
    status,
    tglApproved1,
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
