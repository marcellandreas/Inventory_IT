const DetailStock = require("../models/DetailStock");

// Mendapatkan data detail stock berdasarkan id_detail_stock
exports.getDetailStockById = (req, res) => {
  const id = req.params.id;
  detailStockModel.getDetailStockById(id, (error, result) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else if (!result) {
      res.status(404).json({ message: "Detail Stock not found" });
    } else {
      res
        .status(200)
        .json({ message: "Detail Stock retrieved successfully", data: result });
    }
  });
};

// Mengupdate data detail stock berdasarkan id_detail_stock
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

// Mengupdate beberapa data detail stock sekaligus
exports.updateMultipleDetailStock = (req, res) => {
  const detailStockData = req.body;
  detailStockModel.updateMultipleDetailStock(detailStockData, (error) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ message: "Detail Stocks updated successfully" });
    }
  });
};
