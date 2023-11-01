const StockTemporary = require("../models/StockTemporary");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const stockTemporary = new StockTemporary(dbConfig);

exports.getAllStocksTemporary = (req, res) => {
  stockTemporary.getAllStocksTemporary((error, stocksTemporary) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ data: stocksTemporary });
    }
  });
};

exports.addStockTemporary = (req, res) => {
  const data = req.body;
  stockTemporary.addStockTemporary(data, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(201)
        .json({ message: "Data stok temporary telah ditambahkan." });
    }
  });
};
