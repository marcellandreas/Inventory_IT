const PcMasterModel = require("../models/PcMaster");

const getAllPcMaster = async (req, res) => {
  try {
    const [data] = await PcMasterModel.getAllPcMaster();
    res.json({
      message: "Berhasil Mendapat Data PC Master",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getPcMasterById = async (req, res) => {
  const { id } = req.params;
  let isFound = false;
  try {
    const [data] = await PcMasterModel.getPcMasterById(id);
    isFound = true;
    res.json({
      message: `Berhasil Mengambil Data Barang id ${id} `,
      data: data,
    });
  } catch (error) {
    if (!isFound) {
      res.status(404).json({
        message: "Data tidak ada, masukan id pc master yang benar",
      });
      return;
    }
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createPcMaster = async (req, res) => {
  const { body } = req;
  try {
    await PcMasterModel.createPcMaster(body);
    res.json({
      message: "Berhasil Menambah PC Master",
      data: body,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllPcMaster,
  getPcMasterById,
  createPcMaster,
};
