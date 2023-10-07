const PcLineModel = require("../models/PcLine");

const getAllPcLine = async (req, res) => {
  try {
    const [data] = await PcLineModel.getAllPcLine();
    res.json({
      message: "Berhasil Mengambil Data Pc Line",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDataPcLineByPcNo = async (req, res) => {
  const { pcno } = req.params;
  let isFound = false;
  try {
    const [data] = await PcLineModel.getDataPcLineByPcNo(pcno);
    isFound = true;
    res.json({
      message: `Berhasil Mengambil komponen dari ${pcno} `,
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

module.exports = {
  getAllPcLine,
  getDataPcLineByPcNo,
};
