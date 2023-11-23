const ItemsModel = require("../models/Items");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const items = new ItemsModel(dbConfig);

const sendErrorRes = (res, statusCode, message, error) => {
  res
    .status(statusCode)
    .json({ success: false, message, error: error.message });
};

const sendSuccessRes = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message, data });
};

exports.getAllItems = (req, res) => {
  items.getAllItems((error, data) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Mengambil Data Items", error);
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      sendSuccessRes(res, 200, "Berhasil Mengambil Data Items", data);
    }
  });
};

exports.getUnusedItemNo = (req, res) => {
  items.getUnusedItemNo((error, data) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal Mengambil Data Unused", error);
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      sendSuccessRes(res, 200, "Berhasil Mengambil Data Items", data);
    }
  });
};

exports.getItemById = (req, res) => {
  const { id } = req.params;
  items.getItemById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mengambil Data Item Berdasarkan Id", data });
    }
  });
};

exports.createNewItem = (req, res) => {
  const { body } = req;
  items.createNewItem(body, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(201)
        .json({ message: "Berhasil Membuat Data Barang Baru", data: body });
    }
  });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  items.updateItem(body, id, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({
        message: "Data Barang berhasil diubah",
        data: { id_user: id, ...body },
      });
    }
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  items.deleteItem(id, (error) => {
    if (error) {
      sendErrorRes(res, 500, "Gagal menghapus stok", error);
    } else {
      sendSuccessRes(res, 200, "Item berhasil dihapus", { id });
    }
  });
};
