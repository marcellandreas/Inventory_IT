const Stocks = require("../models/Stocks");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const stocks = new Stocks(dbConfig);

const sendErrorRes = (res, statusCode, message, error) => {
  res
    .status(statusCode)
    .json({ success: false, message, error: error.message });
};

const sendSuccessRes = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message, data });
};

exports.getAllStocks = (req, res) => {
  stocks.getAllStocks((error, stocks) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal mengambil data semua stok", error);
    } else {
      if (stocks.length === 0) {
        sendSuccessRes(res, 404, "Tidak ada data stok yang ditemukan");
      } else {
        sendSuccessRes(res, 200, "Berhasil mengambil data semua stok", stocks);
      }
    }
  });
};

exports.createStock = (req, res) => {
  const { body } = req;
  stocks.createStock(...Object.values(body), (error, stock_no) => {
    if (error) {
      sendErrorRes(res, 500, "Stock gagal dibuat", error);
    } else {
      const data = { stock_no, ...body };
      sendSuccessRes(res, 201, "Stock berhasil dibuat", data);
    }
  });
};

exports.updateStock = (req, res) => {
  const { stock_no } = req.params;
  stocks.updateStock(stock_no, ...Object.values(req.body), (error, result) => {
    if (error) {
      sendErrorRes(res, 500, "Stock gagal diupdate", error);
    } else {
      const data = { stock_no, ...req.body };
      sendSuccessRes(res, 200, "Stock berhasil diupdate", data);
    }
  });
};

exports.deleteStock = (req, res) => {
  const { id } = req.params;
  stocks.deleteStock(id, (error, result) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal menghapus stok", error);
    } else if (result.affectedRows === 0) {
      sendSuccessRes(res, 404, "Stok tidak ditemukan untuk dihapus");
    } else {
      sendSuccessRes(res, 200, "Stok berhasil dihapus", { id });
    }
  });
};

exports.getStockById = (req, res) => {
  const { id } = req.params;
  stocks.getStockById(id, (error, stock) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal mengambil stok berdasarkan ID", error);
    } else if (!stock) {
      sendSuccessRes(res, 404, "Stock tidak ditemukan");
    } else {
      sendSuccessRes(res, 200, "Berhasil mengambil stok berdasarkan ID", stock);
    }
  });
};

exports.getStockByStockNo = (req, res) => {
  const { stockNo } = req.params;
  stocks.getStockByStockNo(stockNo, (error, stock) => {
    if (error) {
      res.status(500).json({
        message: "Gagal mengambil stok berdasarkan nomor stok",
        error: error.message,
      });
    } else if (!stock) {
      res.status(404).json({
        message: "Stok tidak ditemukan berdasarkan nomor stok",
      });
    } else {
      res.status(200).json({
        message: "Berhasil mengambil stok berdasarkan nomor stok",
        data: stock,
      });
    }
  });
};

// Mendapatkan stock_qty berdasarkan stock_no
// exports.updateStockQty = (req, res) => {
//   const stockNo = req.params.stockNo;
//   stocks.calculateStockQty(stockNo, (error, stockQty) => {
//     if (error) {
//       res.status(500).json({
//         message: "Gagal mengambil qty stok berdasarkan nomor stok",
//         error: error.message,
//       });
//     } else if (!stockQty) {
//       res.status(404).json({
//         message: "Qty stok tidak ditemukan berdasarkan nomor stok",
//       });
//     } else {
//       res.status(200).json({
//         message: "Berhasil mengambil qty stok berdasarkan nomor stok",
//         stock_qty: stockQty,
//       });
//     }
//   });
// };

// Memperbarui stock_qty berdasarkan stock_no
exports.updateStockQty = (req, res) => {
  const stockNo = req.params.stockNo;
  stocks.updateStockQty(stockNo, (error) => {
    if (error) {
      res.status(500).json({
        message: "Gagal memperbarui stock_qty",
        error: error.message,
      });
    } else {
      res.status(200).json({
        message: "Berhasil memperbarui stock_qty",
      });
    }
  });
};

// Mengambil daftar stock no tanpa duplikasi

exports.getUniqueStockNo = (req, res) => {
  stocks.getUniqueStockNo((error, stock_no) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data no stock_no",
        error: error.message,
      });
    } else {
      if (stock_no.length === 0) {
        res.status(404).json({
          message: "Tidak ada data no stok yang ditemukan",
        });
      } else {
        res.status(200).json({
          message: "Berhasil mengambil data semua no stok",
          data: stock_no,
        });
      }
    }
  });
};
