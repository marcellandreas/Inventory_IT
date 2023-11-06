const ItemsModel = require("../models/Items");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const items = new ItemsModel(dbConfig);

exports.getAllItems = (req, res) => {
  items.getAllItems((error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ message: "Berhasil Mengambil Data Barang", data });
    }
  });
};

exports.getUnusedItemNo = (req, res) => {
  items.getUnusedItemNo((error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({
        message: "Berhasil Mengambil items yang belum terhubung",
        data,
      });
    }
  });
};

exports.getItemById = (req, res) => {
  const { id } = req.params;
  items.getItemById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      res.status(404).json({ message: "Data tidak ada" });
    } else {
      res.status(200).json({ data });
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
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "Data Barang berhasil dihapus", data: null });
    }
  });
};
