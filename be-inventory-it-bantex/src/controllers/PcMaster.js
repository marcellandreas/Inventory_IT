const PcMasterModel = require("../models/PcMaster");

const getAllPcMaster = async (req, res) => {
  try {
    const [data] = await PcMasterModel.getAllPcMaster();
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

module.exports = {
  getAllPcMaster,
};
