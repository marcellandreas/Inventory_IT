const DetailStockTemporary = require("../models/StocksDetailTemporary");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const detailStockTemporary = new DetailStockTemporary(dbConfig);

exports.getAllDetailStocksTemporary = (req, res) => {
  detailStockTemporary.getAllDetailStocksTemporary(
    (error, detailStocksTemporary) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ data: detailStocksTemporary });
      }
    }
  );
};

exports.createDetailStockTemporary = (req, res) => {
  const detailStockData = req.body;

  // Pastikan req.body adalah array objek yang berisi data detail stok
  if (!Array.isArray(detailStockData)) {
    return res.status(400).json({
      message: "Bad Request",
      serverMessage: "Request body should be an array of objects",
    });
  }

  // Panggil model untuk membuat Detail Stock
  detailStockTemporary.createDetailStockTemporary(detailStockData, (error) => {
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

exports.addDetailStockTemporary = (req, res) => {
  const data = req.body;
  detailStockTemporary.addDetailStockTemporary(data, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(201)
        .json({ message: "Data detail stok temporary telah ditambahkan." });
    }
  });
};
