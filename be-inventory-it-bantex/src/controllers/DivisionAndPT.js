const DivPtModels = require("../models/DivAndPT");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const divisionAndPT = new DivPtModels(dbConfig);

exports.getAllDataPT = (req, res) => {
  divisionAndPT.getAllDataPt((error, data) => {
    if (error) {
      res
        .status(500)
        .json({ message: "Gagal mengambil data pt", error: error.message });
    } else {
      if (!divisionAndPT) {
        res.status(400).json({ message: "Tidak menemukan data pt" });
      } else {
        res.status(200).json({ message: "Berhasil mengambil data pt", data });
      }
    }
  });
};

exports.getDivisionByNamePt = (req, res) => {
  const { name_pt } = req.params;
  divisionAndPT.getItemById(name_pt, (error, divPt) => {
    if (error) {
      res.status(500).json({
        error: error.message,
        message: "Gagal mengambil division berdasarkan PT",
      });
    } else if (!divPt) {
      res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      res.status(200).json({
        message: "Berhasil mengambil division berdasarkan PT",
        data: divPt,
      });
      s;
    }
  });
};
