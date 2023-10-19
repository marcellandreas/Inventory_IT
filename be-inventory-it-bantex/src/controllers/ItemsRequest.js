// controllers/formRequestController.js
const ItemsRequest = require("../models/ItemsRequest");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};
// Buat instance ItemsRequest
const itemsRequest = new ItemsRequest(dbConfig);

// Mendapatkan semua data form request
exports.getAllData = (req, res) => {
  itemsRequest.getAllData((error, results) => {
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

// Membuat form request baru
exports.createFormRequest = (req, res) => {
  const formData = req.body; // Ambil data dari permintaan HTTP
  itemsRequest.createFormRequest(formData, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res
        .status(201)
        .json({ message: "Form Request berhasil dibuat", data: results });
    }
  });
};

// Mengupdate form request
exports.updateFormRequest = (req, res) => {
  const id_item_req = req.params.id_item_req;
  const formData = req.body;
  itemsRequest.updateFormRequest(id_item_req, formData, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res
        .status(200)
        .json({ message: "Form Request berhasil diupdate", data: results });
    }
  });
};

// Menghapus form request
exports.deleteFormRequest = (req, res) => {
  const id_item_req = req.params.id_item_req;
  itemsRequest.deleteFormRequest(id_item_req, (error, results) => {
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
  itemsRequest.getByNoPengajuan(no_pengajuan, (error, results) => {
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
  itemsRequest.updateStatus(id_item_req, status, (error, results) => {
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
  itemsRequest.getByStatusAndUsername(
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
  itemsRequest.getByStatusAndApproved1(status, approved_1, (error, results) => {
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

// Mendapatkan data form request berdasarkan status dan approved_2
exports.getByStatusAndApproved2 = (req, res) => {
  const status = req.params.status;
  const approved_2 = req.params.approved_2;
  itemsRequest.getByStatusAndApproved2(status, approved_2, (error, results) => {
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

// Mendapatkan data form request berdasarkan post_username
exports.getDataByPostUsername = (req, res) => {
  const post_username = req.params.post_username;
  itemsRequest.getDatabyPostUsername(post_username, (error, results) => {
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
  itemsRequest.getDataByCriteria(
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

  itemsRequest.approveFormRequest(
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

  itemsRequest.approveFormRequest2(
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

  itemsRequest.rejectFormRequest(idItemReq, (error, result) => {
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

  itemsRequest.finishFormRequest(
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
