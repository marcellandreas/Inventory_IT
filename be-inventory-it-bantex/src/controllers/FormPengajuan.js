const FormPengajuanModal = require("../models/FormPengajuan");

const getAllDataItemReq = async (req, res) => {
  try {
    const [data] = await FormPengajuanModal.getAllDataItemReq();
    res.json({
      message: "Berhasil Mengambil Data Items Request",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createFormPengajuan = async (req, res) => {
  const { body } = req;
  try {
    await FormPengajuanModal.postItemReq(body);
    res.json({
      message: "Berhasil Membuat Form Pengajuan",
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

const PostsubmissionItems = async (req, res) => {
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
    await FormPengajuanModal.PostsubmissionItems(body);

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

const postSuratPengajuan = async (req, res) => {
  const { body } = req;
  try {
    await FormPengajuanModal.postSuratPengajuan(body);
    res.json({
      message: "Berhasil Menambah Surat Pengajuan",
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
  createFormPengajuan,
  getAllDataItemReq,
  PostsubmissionItems,
  postSuratPengajuan,
};
