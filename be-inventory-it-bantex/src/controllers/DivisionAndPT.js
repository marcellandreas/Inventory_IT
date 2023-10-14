const divisionAndPT = require("../models/DivAndPT");

const getAllDataPT = async (req, res) => {
  try {
    const [data] = await divisionAndPT.getAllDataPt();
    res.json({
      message: "Berhasil Mengambil Data Barang",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDivisionByNamePt = async (req, res) => {
  const { name_pt } = req.params;
  let isFound = false;
  try {
    const [data] = await divisionAndPT.getDivisionByNamePt(name_pt);
    isFound = true;
    res.json({
      message: `Berhasil Mengambil Divisi berdasarkan Nama PT:  ${name_pt} `,
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
  getAllDataPT,
  getDivisionByNamePt,
};
