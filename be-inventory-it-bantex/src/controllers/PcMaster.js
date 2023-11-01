const PcMasterModel = require("../models/PcMaster");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const pcMaster = new PcMasterModel(dbConfig);

exports.getAllPcMaster = (req, res) => {
  pcMaster.getAllPcMaster((error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mendapat Data PC Master", data });
    }
  });
};

exports.getPcMasterById = (req, res) => {
  const { id } = req.params;
  pcMaster.getPcMasterById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      res
        .status(404)
        .json({ message: "Data tidak ada, masukan id pc master yang benar" });
    } else {
      res
        .status(200)
        .json({ message: `Berhasil Mengambil Data Barang id ${id}`, data });
    }
  });
};

exports.getPcMasterByPcNo = (req, res) => {
  const { pcno } = req.params;
  pcMaster.getPcMasterByPcMaster(pcno, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      res
        .status(404)
        .json({ message: "Data tidak ada, masukan PC Number yang benar" });
    } else {
      res
        .status(200)
        .json({ message: `Berhasil Mengambil Data Barang pcno ${pcno}`, data });
    }
  });
};

exports.createPcMaster = (req, res) => {
  const { body } = req;
  pcMaster.createPcMaster(body, (error, code) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(201)
        .json({ message: "Berhasil Menambah PC Master", data: body });
    }
  });
};

exports.UpdatePcMaster = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  pcMaster.updatePcMaster(body, id, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "Data PC Master berhasil diubah", data: body });
    }
  });
};

exports.deletePcMaster = (req, res) => {
  const { id } = req.params;
  pcMaster.deletePcMaster(id, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(204)
        .json({ message: "Data PC Master berhasil dihapus", data: null });
    }
  });
};
