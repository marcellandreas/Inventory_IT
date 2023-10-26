const RequestItems = require("../models/RequestItemModel");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const requestItems = new RequestItems(dbConfig);
// Membuat entri baru request items

exports.createRequestItems = (req, res) => {
  const requestItemsData = req.body;
  requestItems.createRequestItems(requestItemsData, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(201).json({
        message: "Request Items berhasil dibuat",
        data: requestItemsData,
      });
    }
  });
};

// Mendapatkan semua data request items
exports.getAllRequestItems = (req, res) => {
  requestItems.getAllRequestItems((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ data: results });
    }
  });
};

// Mendapatkan data request items berdasarkan ID
exports.getRequestItemsById = (req, res) => {
  const id_request_items = req.params.id;
  requestItems.getRequestItemsById(id_request_items, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ data: results });
    }
  });
};

// Memperbarui data request items berdasarkan ID
exports.updateRequestItemsById = (req, res) => {
  const id_request_items = req.params.id;
  const updatedData = req.body;
  requestItems.updateRequestItemsById(
    id_request_items,
    updatedData,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Data Request Items berhasil diperbarui",
          data: results,
        });
      }
    }
  );
};

// Menghapus data request items berdasarkan ID
exports.deleteRequestItemsById = (req, res) => {
  const id_request_items = req.params.id;
  requestItems.deleteRequestItemsById(id_request_items, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Data Request Items berhasil dihapus",
        data: results,
      });
    }
  });
};
