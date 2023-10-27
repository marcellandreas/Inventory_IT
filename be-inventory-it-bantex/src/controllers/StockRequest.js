const StockRequestModels = require("../models/StockRequest");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const StockRequest = new StockRequestModels(dbConfig);
// Membuat entri baru submission items

exports.createStockRequest = (req, res) => {
  const stockRequestData = req.body;
  StockRequest.createStockRequest(stockRequestData, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(201).json({
        message: "Submission Items berhasil dibuat",
        data: stockRequestData,
      });
    }
  });
};

// Mendapatkan semua data submission items
exports.getAllStockRequest = (req, res) => {
  StockRequest.getAllStockRequest((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ data: results });
    }
  });
};

// Mendapatkan data submission items berdasarkan ID
exports.getStockRequestById = (req, res) => {
  const id_submission_item = req.params.id;
  StockRequest.getStockRequestById(id_submission_item, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else if (results && results.length === 0) {
      res.status(404).json({ message: "Data Not Found" });
    } else {
      res.status(201).json({ data: results });
    }
  });
};

// Memperbarui data submission items berdasarkan ID
exports.updateStockRequestById = (req, res) => {
  const id_submission_item = req.params.id;
  const updatedData = req.body;
  StockRequest.updateStockRequestById(
    id_submission_item,
    updatedData,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Data Submission Items berhasil diperbarui",
          data: results,
        });
      }
    }
  );
};

// Menghapus data submission items berdasarkan ID
exports.deleteStockRequestById = (req, res) => {
  const id_submission_item = req.params.id;
  StockRequest.deleteStockRequestById(id_submission_item, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Data Submission Items berhasil dihapus",
        data: results,
      });
    }
  });
};
