const stocksModel = require("../models/Stocks");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await stocksModel.getAllStock();
    res.json({
      message: "Berhasil Mengambil Data Stock",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getStockById = async (req, res) => {
  const { id } = req.params;
  let isFound = false;
  try {
    const [data] = await stocksModel.getStockById(id);
    isFound = true;
    res.json({
      message: "Berhasil Mengambil Data Stock Berdasarkan ID",
      data: data,
    });
  } catch (error) {
    if (!isFound) {
      res.status(404).json({
        message: "Data tidak ada",
      });
      return;
    }
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewStock = async (req, res) => {
  const { body } = req;
  try {
    await stocksModel.createNewStock(body);
    res.json({
      message: "Berhasil Membuat Data Stock Baru",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateStock = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(id);
  try {
    await stocksModel.updateStock(body, id);
    res.json({
      message: "Data Stock berhasil diubah",
      data: {
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const delateStock = async (req, res) => {
  const { id } = req.params;
  try {
    await stocksModel.deleteStock(id);
    res.json({
      message: "Data Stock berhasil dihapus",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUsers,
  getStockById,
  createNewStock,
  updateStock,
  delateStock,
};
