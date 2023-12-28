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

const getAllDataReqSubandStockRequest = async (req, res) => {
  try {
    const [data] = await FormPengajuanModal.getAllDataReqSubandStockRequest();
    // Map the data and process GROUP_CONCAT results into arrays of objects
    const transformedData = data.map((item) => ({
      id_item_req: item.id_item_req,
      no_pengajuan: item.no_pengajuan,
      name_pt: item.name_pt,
      name_division: item.name_division,
      status: item.status,
      approved_1: item.approved_1,
      approved_2: item.approved_2,
      post_user_id: item.post_user_id,
      post_username: item.post_username,
      post_date: item.post_date,
      date_approved_1: item.date_approved_1,
      date_approved_2: item.date_approved_2,
      date_done: item.date_done,
      request_type: item.request_type,
      request_data:
        item.Id_submission_item &&
        item.Id_submission_item.split(",").map((idSub, index) => ({
          id_submission_item: idSub,
          stock_description:
            item.stock_description && item.stock_description.split(",")[index],
          qty: item.qty && item.qty.split(",")[index],
          note: item.note && item.note.split(",")[index],
        })),
    }));

    res.json({
      message: "berhasil mengambil Data penerimaan barang",
      data: transformedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllDataReqSubandStockRequestByStatus = async (req, res) => {
  try {
    const [data] =
      await FormPengajuanModal.getAllDataReqSubandStockRequestByStatus();
    // Map the data and process GROUP_CONCAT results into arrays of objects
    const transformedData = data.map((item) => ({
      id_item_req: item.id_item_req,
      no_pengajuan: item.no_pengajuan,
      name_pt: item.name_pt,
      name_division: item.name_division,
      status: item.status,
      approved_1: item.approved_1,
      approved_2: item.approved_2,
      post_user_id: item.post_user_id,
      post_username: item.post_username,
      post_date: item.post_date,
      date_approved_1: item.date_approved_1,
      date_approved_2: item.date_approved_2,
      date_done: item.date_done,
      request_type: item.request_type,
      request_data:
        item.Id_submission_item &&
        item.Id_submission_item.split(",").map((idSub, index) => ({
          id_submission_item: idSub,
          stock_description:
            item.stock_description && item.stock_description.split(",")[index],
          qty: item.qty && item.qty.split(",")[index],
          note: item.note && item.note.split(",")[index],
        })),
    }));

    res.json({
      message: "berhasil mengambil Data penerimaan barang",
      data: transformedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllDataReqSubandStockRequestById = async (req, res) => {
  const { id_item_req } = req.params;
  let isFound = false;
  try {
    const [data] = await FormPengajuanModal.getAllDataReqSubandStockRequestById(
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
          id_detail_stock:
            item.id_detail_stock && item.id_detail_stock.split(",")[index],
        })),
    }));
    isFound = true;
    res.json({
      message: `berhasil mengambil data pengajuan barang dari id ${id_item_req} `,
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

// Stock Submission

const getAllDataReqSubandStockSubmission = async (req, res) => {
  try {
    const [data] =
      await FormPengajuanModal.getAllDataReqSubandStockSubmission();
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
      date_approved_1: item.date_approved_1,
      date_approved_2: item.date_approved_2,
      date_done: item.date_done,
      request_type: item.request_type,
      submissionData:
        item.id_stock_sub &&
        item.id_stock_sub.split(",").map((idSub, index) => ({
          id_stock_sub: idSub,
          stock_description:
            item.stock_description && item.stock_description.split(",")[index],
          qty: item.qty && item.qty.split(",")[index],
          note: item.note && item.note.split(",")[index],
          id_detail_stock:
            item.id_detail_stock && item.id_detail_stock.split(",")[index],
        })),
    }));

    res.json({
      message: "berhasil mengambil Data pengajuan barang",
      data: transformedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getAllDataReqSubandStockSubmissionById = async (req, res) => {
  const { id_stock_sub } = req.params;
  let isFound = false;
  try {
    const [data] =
      await FormPengajuanModal.getAllDataReqSubandStockSubmissionById(
        id_stock_sub
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
        item.id_stock_sub &&
        item.id_stock_sub.split(",").map((idSub, index) => ({
          id_stock_sub: idSub,
          stock_description:
            item.stock_description && item.stock_description.split(",")[index],
          qty: item.qty && item.qty.split(",")[index],
          note: item.note && item.note.split(",")[index],
          stock_no: item.stock_no && item.stock_no.split(",")[index],
          id_detail_stock:
            item.id_detail_stock && item.id_detail_stock.split(",")[index],
        })),
    }));
    isFound = true;
    res.json({
      message: `berhasil mengambil data penerimaan barang dari id ${id_stock_sub} `,
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

const getAllDataReqSubandStockSubmissionByStatus = async (req, res) => {
  try {
    const [data] =
      await FormPengajuanModal.getAllDataReqSubandStockSubmissionByStatus();
    // Map the data and process GROUP_CONCAT results into arrays of objects
    console.log(data);
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
      date_approved_1: item.date_approved_1,
      date_approved_2: item.date_approved_2,
      date_done: item.date_done,
      request_type: item.request_type,
      submissionData:
        item.id_stock_sub &&
        item.id_stock_sub.split(",").map((idSub, index) => ({
          id_stock_sub: idSub,
          stock_description:
            item.stock_description && item.stock_description.split(",")[index],
          qty: item.qty && item.qty.split(",")[index],
          note: item.note && item.note.split(",")[index],
          id_detail_stock:
            item.id_detail_stock && item.id_detail_stock.split(",")[index],
        })),
    }));

    res.json({
      message: "berhasil mengambil Data pengajuan barang berdadarkan status",
      data: transformedData,
    });
  } catch (error) {
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

module.exports = {
  getAllDataItemReq,
  PostsubmissionItems,
  getDataItemReqByUsername,
  // stock request
  getAllDataReqSubandStockRequest,
  getAllDataReqSubandStockRequestById,
  getAllDataReqSubandStockRequestByStatus,
  // stock submission
  getAllDataReqSubandStockSubmission,
  getAllDataReqSubandStockSubmissionById,
  getAllDataReqSubandStockSubmissionByStatus,
};
