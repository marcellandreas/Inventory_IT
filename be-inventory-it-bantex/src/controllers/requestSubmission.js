// controllers/formRequestController.js
const requestSubmissionModels = require("../models/requestSubmission");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};
// Buat instance requestSubmissionModels
const requestSubmission = new requestSubmissionModels(dbConfig);

// Mendapatkan semua data form request
exports.getAllData = (req, res) => {
  requestSubmission.getAllData((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Form Request",
        data: results,
      });
    }
  });
};
exports.getDataPostDateNew = (req, res) => {
  requestSubmission.getDataPostDateNew((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Terbaru ",
        data: results,
      });
    }
  });
};

exports.getReqSubById = (req, res) => {
  const { id } = req.params;
  requestSubmission.getReqSubById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      res.status(404).json({
        message: `Pengajuan atau Penerimaan tidak ditemukan dengan id: ${id}`,
      });
    } else {
      res.status(200).json({ data });
    }
  });
};

// Membuat form request baru
// exports.createFormRequest = (req, res) => {
//   const formData = req.body; // Ambil data dari permintaan HTTP
//   requestSubmission.createFormRequest(formData, (error, results) => {
//     if (error) {
//       res.status(500).json({ message: "Server Error", serverMessage: error });
//     } else {
//       res
//         .status(201)
//         .json({ message: "Form Request berhasil dibuat", data: results });
//     }
//   });
// };

const getFormattedDate = (req, res) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Membuat bulan dimulai dari 1
  const year = currentDate.getFullYear();
  return `${year}-${String(month).padStart(2, "0")}`;
};

let currentMonth = "";
let currentCounter = 0;

exports.createFormRequest = async (req, res) => {
  const { body } = req;

  try {
    // Periksa apakah bulan saat ini berbeda dengan yang sebelumnya
    const currentDate = getFormattedDate();
    if (currentDate !== currentMonth) {
      // Jika bulan berbeda, reset nomor urut ke 001
      currentMonth = currentDate;
      currentCounter = 1;
    } else {
      // Jika masih di bulan yang sama, tingkatkan nomor urut
      currentCounter += 1;
    }

    // Format nomor urut dengan 3 digit (001, 002, dst.)
    const formattedCounter = String(currentCounter).padStart(3, "0");
    const noPengajuan = `IT-${currentDate}-${formattedCounter}`;

    // Simpan nomor pengajuan ke dalam data pengajuan
    body.no_pengajuan = noPengajuan;

    await requestSubmission.createFormRequest(body);

    res.json({
      message: "Berhasil Membuat Data Barang Baru",
      data: body,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
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
  const id_item_req = req.params.id_item_req;
  requestSubmission.deleteFormRequest(id_item_req, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res
        .status(200)
        .json({ message: "Form Request berhasil dihapus", data: results });
    }
  });
};

// Mendapatkan data form request berdasarkan no_pengajuan
exports.getByNoPengajuan = (req, res) => {
  const no_pengajuan = req.params.no_pengajuan;
  requestSubmission.getByNoPengajuan(no_pengajuan, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Form Request",
        data: results,
      });
    }
  });
};

// Mengupdate status form request
exports.updateStatus = (req, res) => {
  const id_item_req = req.params.id_item_req;
  const status = req.body.status;
  requestSubmission.updateStatus(id_item_req, status, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Berhasil Mengambil Data Form Request",
          data: results,
        });
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Berhasil Mengambil Data Form Request",
          data: results,
        });
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Berhasil Mengambil Data Form Request",
          data: results,
        });
      }
    }
  );
};

// Mendapatkan data form request berdasarkan post_username
exports.getDataByPostUsername = (req, res) => {
  const post_username = req.params.post_username;
  requestSubmission.getDatabyPostUsername(post_username, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Form Request",
        data: results,
      });
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Berhasil Mengambil Data Items Request",
          data: results,
        });
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res
          .status(200)
          .json({ message: "Status berhasil diubah", data: result });
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res
          .status(200)
          .json({ message: "Status berhasil diubah", data: result });
      }
    }
  );
};

// Menghapus tanggal approved saat status ditolak
exports.rejectFormRequest = (req, res) => {
  const { idItemReq } = req.params;

  requestSubmission.rejectFormRequest(idItemReq, (error, result) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res
        .status(200)
        .json({ message: "Tanggal approved dihapus", data: result });
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
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res
          .status(200)
          .json({ message: "Status berhasil diubah", data: result });
      }
    }
  );
};
