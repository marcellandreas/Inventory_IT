const PcLineModel = require("../models/PcLine");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const pcLine = new PcLineModel(dbConfig);

exports.getAllPcLine = (req, res) => {
  pcLine.getAllPcLine((error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mengambil Data Pc Line", data });
    }
  });
};

exports.getDataPcLineByPcNo = (req, res) => {
  const { pcno } = req.params;
  pcLine.getDataPcLineByPcNo(pcno, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      res.status(404).json({ message: "Data tidak ada" });
    } else {
      res
        .status(200)
        .json({ message: `Berhasil Mengambil komponen dari ${pcno}`, data });
    }
  });
};

exports.createPcLine = (req, res) => {
  const { body } = req;
  pcLine.createPcLine(body, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(201)
        .json({
          message: `Berhasil Menambahkan ${body.length} komponen`,
          data: body,
        });
    }
  });
};

exports.deleteMulti = (req, res) => {
  const { item_nos } = req.body;
  pcLine.deletePcLines(item_nos, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(204).json({ message: "Data berhasil dihapus", data: null });
    }
  });
};
