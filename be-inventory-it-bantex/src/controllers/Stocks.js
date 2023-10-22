const Stocks = require("../models/Stocks");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const stocks = new Stocks(dbConfig);

exports.getAllStocks = (req, res) => {
  stocks.getAllStocks((error, stocks) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ data: stocks });
    }
  });
};

exports.createStock = (req, res) => {
  const {
    stock_description,
    stock_qty,
    category,
    unit,
    type,
    note,
    post_user_id,
    post_username,
  } = req.body;
  const { body } = req;
  stocks.createStock(
    stock_description,
    stock_qty,
    category,
    unit,
    type,
    note,
    post_user_id,
    post_username,
    (error, stock_no) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({
          message: "Stock berhasil dibuat",
          data: {
            stock_no,
            stock_description,
            stock_qty,
            category,
            unit,
            type,
            note,
            post_user_id,
            post_username,
          },
        });
      }
    }
  );
};

exports.updateStock = (req, res) => {
  const { stock_no } = req.params;
  const {
    stock_description,
    stock_qty,
    category,
    unit,
    type,
    note,
    post_user_id,
    post_username,
  } = req.body;
  stocks.updateStock(
    stock_no,
    stock_description,
    stock_qty,
    category,
    unit,
    type,
    note,
    post_user_id,
    post_username,
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({
          message: "Stock berhasil diupdate",
          data: {
            stock_no,
            stock_description,
            stock_qty,
            category,
            unit,
            type,
            note,
            post_user_id,
            post_username,
          },
        });
      }
    }
  );
};

exports.deleteStock = (req, res) => {
  const { id } = req.params;
  stocks.deleteStock(id, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ message: "Stock berhasil dihapus" });
    }
  });
};

exports.getStockById = (req, res) => {
  const { id } = req.params;
  stocks.getStockById(id, (error, stock) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!stock) {
      res.status(404).json({ message: "Stock not found" });
    } else {
      res.status(200).json({ stock });
    }
  });
};
exports.getStockByStockNo = (req, res) => {
  const { stockNo } = req.params;
  stocks.getStockByStockNo(stockNo, (error, stock) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!stock) {
      res.status(404).json({ message: "Stock not found" });
    } else {
      res.status(200).json({ stock });
    }
  });
};

// Mendapatkan stock_qty berdasarkan stock_no
exports.getStockQty = (req, res) => {
  const stockNo = req.params.stockNo;
  stocks.calculateStockQty(stockNo, (error, stockQty) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil stock_qty",
        stock_qty: stockQty,
      });
    }
  });
};

// Memperbarui stock_qty berdasarkan stock_no
exports.updateStockQty = (req, res) => {
  const stockNo = req.params.stockNo;
  stocks.updateStockQty(stockNo, (error) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({
        message: "stock_qty berhasil diperbarui",
      });
    }
  });
};

// Mengambil daftar stock no tanpa duplikasi
exports.getUniqueStockNo = (req, res) => {
  stocks.getUniqueStockNo((error, stock_no) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      console.log(1);
      res.status(200).json({
        message: "Daftar Stock No",
        data: stock_no,
      });
    }
  });
};
