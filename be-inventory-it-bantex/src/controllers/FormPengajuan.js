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

const getDataItemReqByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const [data] = await FormPengajuanModal.getDataItemReqByUsername(username);

    if (!data) {
      return res.status(404).json({
        message: `Username "${username}" tidak ditemukan`,
      });
    }

    res.json({
      message: `Berhasil Mengambil Data Form Pengajuan`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllDataPengajuan = async (req, res) => {
  try {
    const [data] = await FormPengajuanModal.getAllDataPengajuan();
    // Map the data and process GROUP_CONCAT results into arrays of objects
    const transformedData = data.map((item) => ({
      no_pengajuan: item.no_pengajuan,
      name_pt: item.name_pt,
      name_division: item.name_division,
      status: item.status,
      approved_1: item.approved_1,
      approved_2: item.approved_2,
      post_user_id: item.post_user_id,
      post_username: item.post_username,
      post_date: item.post_date,
      submissionData:
        item.Id_submission_item &&
        item.Id_submission_item.split(",").map((idSub, index) => ({
          Id_submission_items: idSub,
          no_pengajuan:
            item.no_pengajuan && item.no_pengajuan.split(",")[index],
          stock_description:
            item.stock_description && item.stock_description.split(",")[index],
          qty: item.qty && item.qty.split(",")[index],
          note: item.note && item.note.split(",")[index],
          stock_no: item.stock_no && item.stock_no.split(",")[index],
        })),
    }));

    res.json({
      message: "Berhasil Mengambil Data Pengajuan",
      data: transformedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDataPengajuanByIdForm = async (req, res) => {
  const { id_item_req } = req.params;
  let isFound = false;
  try {
    const [data] = await FormPengajuanModal.getDataAllPengajuanByIdForm(
      id_item_req
    );
    const transformedData = data.map((item) => ({
      no_pengajuan: item.no_pengajuan,
      name_pt: item.name_pt,
      name_division: item.name_division,
      status: item.status,
      applicant: item.applicant,
      approved_1: item.approved_1,
      approved_2: item.approved_2,
      post_user_id: item.post_user_id,
      post_username: item.post_username,
      post_date: item.post_date,
      submissionData:
        item.Id_submission_item &&
        item.Id_submission_item.split(",").map((idSub, index) => ({
          Id_submission_items: idSub,
          stock_description:
            item.stock_description && item.stock_description.split(",")[index],
          qty: item.qty && item.qty.split(",")[index],
          note: item.note && item.note.split(",")[index],
          stock_no: item.stock_no && item.stock_no.split(",")[index],
        })),
    }));
    isFound = true;
    res.json({
      message: `Berhasil Mengambil Data Barang id_item_req ${id_item_req} `,
      data: transformedData,
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

const getFormattedDate = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Membuat bulan dimulai dari 1
  const year = currentDate.getFullYear();
  return `${year}-${String(month).padStart(2, "0")}`;
};

let currentMonth = "";
let currentCounter = 0;

const createFormPengajuan = async (req, res) => {
  const { body } = req;

  try {
    // Periksa apakah bulan saat ini berbeda dengan yang sebelumnya
    const currentDate = getFormattedDate();
    if (currentDate !== currentMonth) {
      // Jika bulan berbeda, reset nomor urut ke 001
      currentMonth = currentDate;
      currentCounter = 1;
    } else {
      // Jika masih di bulan yang sama, tingkatkan nomor urut
      currentCounter += 1;
    }

    // Format nomor urut dengan 3 digit (001, 002, dst.)
    const formattedCounter = String(currentCounter).padStart(3, "0");
    const noPengajuan = `IT-${currentDate}-${formattedCounter}`;

    // Simpan nomor pengajuan ke dalam data pengajuan
    body.no_pengajuan = noPengajuan;

    await FormPengajuanModal.postItemReq(body);

    res.json({
      message: "Berhasil Membuat Data Barang Baru",
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

const getFormattedDateSub = () => {
  const currentDateSub = new Date();
  const month = currentDateSub.getMonth() + 1; // Membuat bulan dimulai dari 1
  const year = currentDateSub.getFullYear();
  return `${year}-${String(month).padStart(2, "0")}`;
};

let currentMonthSub = "";
let currentCounterSub = 0;
const createFormSubmission = async (req, res) => {
  const { body } = req;

  try {
    // Periksa apakah bulan saat ini berbeda dengan yang sebelumnya
    const currentDateSub = getFormattedDateSub();
    if (currentDateSub !== currentMonthSub) {
      // Jika bulan berbeda, reset nomor urut ke 001
      currentMonthSub = currentDateSub;
      currentCounterSub = 1;
    } else {
      // Jika masih di bulan yang sama, tingkatkan nomor urut
      currentCounterSub += 1;
    }

    // Format nomor urut dengan 3 digit (001, 002, dst.)
    const formattedCounter = String(currentCounterSub).padStart(3, "0");
    const noSub = `IT-SUB-${currentDateSub}-${formattedCounter}`;

    if (!Array.isArray(body)) {
      return res.status(400).json({
        message: "Bad Request",
        serverMessage: "Body should be an array of objects",
      });
    }
    // Simpan nomor pengajuan ke dalam data pengajuan
    body.no_sub = noSub;

    await FormPengajuanModal.PostsubmissionItems(body);

    res.json({
      message: "Berhasil Membuat Data Barang Baru",
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

// const deleteDataPengajuan = async (req, res) => {
//   const { no_pengajuan } = req.params;

//   try {
//     const result = await FormPengajuanModel.deleteDataPengajuan(no_pengajuan);

//     if (result.affectedRows === 0) {
//       // Data tidak ditemukan
//       res.status(404).json({ message: 'Data tidak ditemukan' });
//     } else {
//       // Data berhasil dihapus
//       res.json({ message: 'Data berhasil dihapus' });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       serverMessage: error,
//     });
//   }
// };

const deleteFormReqItems = async (req, res) => {
  const { no_pengajuan } = req.body;
  console.log(no_pengajuan);
  try {
    await FormPengajuanModal.deleteFormRequestItems(no_pengajuan);
    res.json({
      message: "Form Pengajuan Barang IT berhasil dihapus",
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
  createFormPengajuan,
  deleteFormReqItems,
  getAllDataItemReq,
  PostsubmissionItems,
  postSuratPengajuan,
  getAllDataPengajuan,
  getDataPengajuanByIdForm,
  getDataItemReqByUsername,
  createFormSubmission,
};
