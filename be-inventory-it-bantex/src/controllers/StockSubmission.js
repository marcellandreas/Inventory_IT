const StockSubmissionModel = require("../models/StockSubmission");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const stockSubmission = new StockSubmissionModel(dbConfig);
// Membuat entri baru request items

exports.createStockSubmission = (req, res) => {
  const stockSubmissionData = req.body;
  stockSubmission.createStockSubmission(
    stockSubmissionData,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(201).json({
          message: "Stock Pengajuan berhasil dibuat",
          data: stockSubmissionData,
        });
      }
    }
  );
};

// Mendapatkan semua data request items
exports.getAllStockSubmission = (req, res) => {
  stockSubmission.getAllStockSubmission((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ data: results });
    }
  });
};

// Mendapatkan data request items berdasarkan ID
exports.getStockSubmissionById = (req, res) => {
  const id_request_items = req.params.id;
  stockSubmission.getStockSubmissionById(id_request_items, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ data: results });
    }
  });
};

// Memperbarui data request items berdasarkan ID
exports.updateStockSubmissionById = (req, res) => {
  const id_request_items = req.params.id;
  const updatedData = req.body;
  stockSubmission.updateStockSubmissionById(
    id_request_items,
    updatedData,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Data Stock Pengajuan berhasil diperbarui",
          data: results,
        });
      }
    }
  );
};

// Menghapus data request items berdasarkan ID
exports.deleteStockSubmissionById = (req, res) => {
  const id_request_items = req.params.id;
  stockSubmission.deleteStockSubmissionById(
    id_request_items,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Data Stock Pengajuan berhasil dihapus",
          data: results,
        });
      }
    }
  );
};
