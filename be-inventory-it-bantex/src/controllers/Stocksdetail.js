const DetailStockModel = require("../models/StocksDetail");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const detailStockModel = new DetailStockModel(dbConfig);
const { sendErrorRes, sendSuccessRes } = require("../helpers/response");

// Mendapatkan semua data detail stok
exports.getAllDetailStock = (req, res) => {
  detailStockModel.getAllDetailStock((error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          success: false,
          message: "Tidak ada data detail stock yang ditemukan",
        });
      } else {
        sendSuccessRes(
          res,
          200,
          `Berhasil Mengambil Data Detail Stock`,
          results
        );
      }
    }
  });
};

exports.getDetailStockQtyAboveOne = (req, res) => {
  detailStockModel.getDetailStockQtyAboveOne((error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      sendSuccessRes(
        res,
        200,
        `Berhasil Mengambil Data Detail Stock qty diatas 1`,
        results
      );
    }
  });
};

// Mendapatkan detail stok berdasarkan ID
exports.getDetailStockById = (req, res) => {
  const detailStockId = req.params.id;

  detailStockModel.getDetailStockById(detailStockId, (error, detailStock) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      if (detailStock) {
        res.status(200).json({ message: "Berhasil", data: detailStock });
      } else {
        sendSuccessRes(res, 404, `Tidak Menemukan Data id :${id_item_req}`);
      }
    }
  });
};

// Membuat detail stok (bisa membuat lebih dari satu)
exports.createDetailStock = (req, res) => {
  const detailStockData = req.body;

  // Pastikan req.body adalah array objek yang berisi data detail stok
  if (!Array.isArray(detailStockData)) {
    return res.status(400).json({
      message: "Bad Request",
      serverMessage: "Request body should be an array of objects",
    });
  }

  // Panggil model untuk membuat Detail Stock
  detailStockModel.createDetailStock(detailStockData, (error) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      res.status(201).json({
        message: `Berhasil Menambahkan ${detailStockData.length} detail stok`,
        data: detailStockData,
      });
    }
  });
};

// Mendapatkan detail stok berdasarkan stock_no
exports.getDetailStockByStockNo = (req, res) => {
  const stockNo = req.params.stockNo;
  detailStockModel.getDetailStockByStockNo(stockNo, (error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      sendSuccessRes(res, 200, `Berhasil Mengambil Data Detail Stock`, results);
    }
  });
};

// Mendapatkan data form request berdasarkan no_pengajuan
exports.getByNoPengajuan = (req, res) => {
  const no_pengajuan = req.params.no_pengajuan;
  itemsRequest.getByNoPengajuan(no_pengajuan, (error, results) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      sendSuccessRes(res, 200, `Berhasil Mengambil Data Detail Stock`, results);
    }
  });
};

exports.updateDetailStockById = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  detailStockModel.updateDetailStockById(id, updatedData, (error) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      sendSuccessRes(res, 200, `Berhasil Mengupdate Data Detail Stock `);
    }
  });
};

// Menghapus detail stok
exports.deleteDetailStock = (req, res) => {
  const detailStockId = req.params.id;
  detailStockModel.deleteDetailStock(detailStockId, (error) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      sendSuccessRes(res, 200, `Berhasil Menghapus Data Detail Stock`);
    }
  });
};

// Controllers - stocksDetailController.js
// Metode untuk mengupdate lebih dari satu data
exports.updateMultipleDetailStock = (req, res) => {
  const data = req.body; // Data yang akan diupdate, contoh: [{ id_detail_stock: 1, qty: 5 }, { id_detail_stock: 2, qty: 10 }]

  detailStockModel.updateMultipleDetailStock(data, (error) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      sendSuccessRes(res, 200, `Berhasil Mengurangi Data qty Detail Stock `);
    }
  });
};

exports.updatePlusDetailStock = (req, res) => {
  const data = req.body; // Data yang akan diupdate, contoh: [{ id_detail_stock: 1, qty: 5 }, { id_detail_stock: 2, qty: 10 }]

  detailStockModel.updatePlusDetailStock(data, (error) => {
    if (error) {
      sendErrorRes(res, 500, "Server Error", error);
    } else {
      sendSuccessRes(res, 200, `Berhasil Menambah Data qty Detail Stock `);
    }
  });
};
