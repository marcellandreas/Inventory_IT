const DetailStockModel = require("../models/StocksDetail");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const detailStockModel = new DetailStockModel(dbConfig);

// Mendapatkan semua data detail stok
exports.getAllDetailStock = (req, res) => {
  detailStockModel.getAllDetailStock((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Detail Stock",
        data: results,
      });
    }
  });
};

// Mendapatkan detail stok berdasarkan ID
exports.getDetailStockById = (req, res) => {
  const detailStockId = req.params.id;
  detailStockModel.getDetailStockById(detailStockId, (error, detailStock) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json(detailStock);
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
      res.status(500).json({
        message: "Server Error",
        serverMessage: error,
      });
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
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil Data Form Request",
        data: results,
      });
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

exports.updateDetailStockById = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  detailStockModel.updateDetailStockById(id, updatedData, (error) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ message: "Detail Stock updated successfully" });
    }
  });
};

// Menghapus detail stok
exports.deleteDetailStock = (req, res) => {
  const detailStockId = req.params.id;
  detailStockModel.deleteDetailStock(detailStockId, (error) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ message: "Detail Stock deleted successfully" });
    }
  });
};
