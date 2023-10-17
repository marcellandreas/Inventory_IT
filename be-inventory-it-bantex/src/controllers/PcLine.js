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

const createPcLine = async (req, res) => {
  const { body } = req;
  try {
    // Pastikan body adalah array objek yang berisi data yang akan dimasukkan
    if (!Array.isArray(body)) {
      return res.status(400).json({
        message: "Bad Request",
        serverMessage: "Body should be an array of objects",
      });
    }

    // Panggil model untuk membuat semua data sekaligus
    await PcLineModel.createPcLine(body);

    res.json({
      message: `Berhasil Menambahkan ${body.length} komponen`,
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// const delatePcLine = async (req, res) => {
//   const { item_no } = req.params;
//   try {
//     await PcLineModel.deletePcLines(item_no);
//     res.json({
//       message: "Data Berhasil Dipisah",
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       serverMessage: error,
//     });
//   }
// };

const deleteMulti = async (req, res) => {
  try {
    const { item_nos } = req.body; // Ambil data item_nos dari body permintaan

    if (!item_nos || !Array.isArray(item_nos) || item_nos.length === 0) {
      return res.status(400).json({ message: "Data item_nos tidak valid." });
    }

    // Panggil model Anda untuk menghapus item-item tersebut
    await PcLineModel.deletePcLines(item_nos);

    res.json({
      message: "Data berhasil dihapus",
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
  getAllPcLine,
  getDataPcLineByPcNo,
  createPcLine,
  deleteMulti,
  // delatePcLine,
};
