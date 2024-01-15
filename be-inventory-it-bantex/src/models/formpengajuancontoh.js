const pool = require("../config/database");

const getAllDataItemReq = () => {
  const SQLQuery = `SELECT * FROM request_submission`;
  return pool.execute(SQLQuery);
};

const getDataItemReqByUsername = (username) => {
  const SQLQuery = `SELECT request_submission.* FROM request_submission JOIN user ON request_submission.post_username = user.username WHERE user.username = '${username}';`;
  return pool.execute(SQLQuery);
};

const getAllDataReqSubandStockRequest = () => {
  const SQLQuery = `
  SELECT 
  rs.id_req_sub,
  rs.no_pengajuan, 
  rs.name_pt, 
  rs.name_division, 
  rs.status,
  rs.approved_1, 
  rs.approved_2, 
  rs.post_user_id, 
  rs.post_username, 
  rs.post_date, 
  rs.date_approved_1,
  rs.date_approved_2,
  rs.date_done,
  rs.request_type,
  GROUP_CONCAT(sr.Id_submission_item) AS Id_submission_item,
  GROUP_CONCAT(sr.stock_description) AS stock_description, 
  GROUP_CONCAT(sr.qty) AS qty, 
  GROUP_CONCAT(sr.note) AS note,
  GROUP_CONCAT(sr.id_detail_stock) AS id_detail_stock,
  GROUP_CONCAT(stocks.stock_description) AS stock_name,
  GROUP_CONCAT(stocks.stock_qty) AS stock_qty,
  GROUP_CONCAT(stocks.category) AS category
FROM request_submission rs
LEFT JOIN stock_request sr ON rs.no_pengajuan = sr.no_pengajuan 
LEFT JOIN stocks ON sr.stock_no = stocks.stock_no
WHERE rs.request_type = "REQUEST"
GROUP BY rs.no_pengajuan;

  `;
  return pool.execute(SQLQuery);
};

const getAllDataReqSubandStockRequestById = (id_req_sub) => {
  const SQLQuery = `
    SELECT 
      request_submission.no_pengajuan, 
      request_submission.name_pt, 
      request_submission.name_division, 
      request_submission.status, 
      request_submission.approved_1, 
      request_submission.approved_2, 
      request_submission.post_user_id, 
      request_submission.post_username, 
      request_submission.post_date, 
      request_submission.date_approved_1,
      request_submission.date_approved_2,
      request_submission.date_done,
      request_submission.request_type,
      GROUP_CONCAT(stock_request.Id_submission_item) AS Id_submission_item, 
      GROUP_CONCAT(stock_request.stock_description) AS stock_description, 
      GROUP_CONCAT(stock_request.qty) AS qty, 
      GROUP_CONCAT(stock_request.note) AS note, 
      GROUP_CONCAT(stock_request.stock_no) AS stock_no,
      GROUP_CONCAT(stock_request.id_detail_stock) AS id_detail_stock,
      GROUP_CONCAT(stocks.stock_description) AS stock_name,
      GROUP_CONCAT(stocks.stock_qty) AS stock_qty,
      GROUP_CONCAT(stocks.category) AS category
    FROM request_submission 
    LEFT JOIN stock_request ON request_submission.no_pengajuan = stock_request.no_pengajuan 
    LEFT JOIN stocks ON stock_request.stock_no = stocks.stock_no
    WHERE request_submission.id_req_sub = ?
    GROUP BY request_submission.no_pengajuan;`;

  return pool.execute(SQLQuery, [id_req_sub]);
};

const getAllDataReqSubandStockRequestByStatus = () => {
  const SQLQuery = `SELECT 
  request_submission.no_pengajuan, 
  request_submission.name_pt, 
  request_submission.name_division, 
  request_submission.status, 
  request_submission.approved_1, 
  request_submission.approved_2, 
  request_submission.post_user_id, 
  request_submission.post_username, 
  request_submission.post_date, 
  request_submission.date_approved_1,
  request_submission.date_approved_2,
  request_submission.date_done,
  request_submission.request_type,
  GROUP_CONCAT(stock_request.Id_submission_item) AS Id_submission_item, 
  GROUP_CONCAT(stock_request.stock_description) AS stock_description, 
  GROUP_CONCAT(stock_request.qty) AS qty, 
  GROUP_CONCAT(stock_request.note) AS note, 
  GROUP_CONCAT(stock_request.stock_no) AS stock_no,
  GROUP_CONCAT(stock_request.id_detail_stock) AS id_detail_stock,
  GROUP_CONCAT(stocks.stock_description) AS stock_name,
  GROUP_CONCAT(stocks.stock_qty) AS stock_qty,
  GROUP_CONCAT(stocks.category) AS category 
  FROM request_submission 
  LEFT JOIN stock_request ON request_submission.no_pengajuan = stock_request.no_pengajuan 
  LEFT JOIN stocks ON stock_request.stock_no = stocks.stock_no
  WHERE request_submission.status = "Selesai"
AND request_submission.request_type = "REQUEST"
  GROUP BY request_submission.no_pengajuan;`;
  return pool.execute(SQLQuery);
};

const getAllDataReqSubandStockSubmission = () => {
  const SQLQuery = `
  SELECT
  rs.id_req_sub,
  rs.no_pengajuan,
  rs.name_pt,
  rs.name_division,
  rs.status,
  rs.approved_1,
  rs.approved_2,
  rs.post_user_id,
  rs.post_username,
  rs.post_date,
  rs.date_approved_1,
  rs.date_approved_2,
  rs.date_done,
  rs.request_type,
  GROUP_CONCAT(ss.id_stock_sub) AS id_stock_sub,
  GROUP_CONCAT(ss.stock_description) AS stock_description,
  GROUP_CONCAT(ss.qty) AS qty,
  GROUP_CONCAT(ss.note) AS note,
  GROUP_CONCAT(stocks.stock_description) AS stock_name,
  GROUP_CONCAT(stocks.stock_qty) AS stock_qty,
  GROUP_CONCAT(stocks.category) AS category
  FROM request_submission rs
  LEFT JOIN stock_submission ss ON rs.no_pengajuan = ss.no_pengajuan
  LEFT JOIN stocks ON ss.stock_no = stocks.stock_no
  WHERE rs.request_type = "SUBMISSION"
  GROUP BY rs.no_pengajuan;
  `;
  return pool.execute(SQLQuery);
};

const getAllDataReqSubandStockSubmissionById = (id_stock_sub) => {
  const SQLQuery = `SELECT 
  request_submission.no_pengajuan, 
  request_submission.name_pt, 
  request_submission.name_division, 
  request_submission.status, 
  request_submission.approved_1, 
  request_submission.approved_2, 
  request_submission.post_user_id, 
  request_submission.post_username, 
  request_submission.post_date, 
  request_submission.date_approved_1,
  request_submission.date_approved_2,
  request_submission.date_done,
  request_submission.request_type,
  GROUP_CONCAT(stock_submission.id_stock_sub) AS id_stock_sub, 
  GROUP_CONCAT(stock_submission.stock_description) AS stock_description, 
  GROUP_CONCAT(stock_submission.qty) AS qty, 
  GROUP_CONCAT(stock_submission.note) AS note,
  GROUP_CONCAT(stock_submission.stock_no) AS stock_no, 
  GROUP_CONCAT(stock_submission.id_detail_stock) AS id_detail_stock,
  GROUP_CONCAT(stocks.stock_description) AS stock_name,
  GROUP_CONCAT(stocks.stock_qty) AS stock_qty,
  GROUP_CONCAT(stocks.category) AS category
  FROM request_submission 
  LEFT JOIN stock_submission ON request_submission.no_pengajuan = stock_submission.no_pengajuan
  LEFT JOIN stocks ON stock_submission.stock_no = stocks.stock_no
  WHERE request_submission.id_req_sub = ? 
  GROUP BY request_submission.no_pengajuan;`;

  return pool.execute(SQLQuery, [id_stock_sub]);
};
const getAllDataReqSubandStockSubmissionByStatus = () => {
  const SQLQuery = `SELECT 
  request_submission.no_pengajuan, 
  request_submission.name_pt, 
  request_submission.name_division, 
  request_submission.status, 
  request_submission.approved_1, 
  request_submission.approved_2, 
  request_submission.post_user_id, 
  request_submission.post_username, 
  request_submission.post_date, 
  request_submission.date_approved_1,
  request_submission.date_approved_2,
  request_submission.date_done,
  request_submission.request_type,
  GROUP_CONCAT(stock_submission.id_stock_sub) AS id_stock_sub, 
  GROUP_CONCAT(stock_submission.stock_description) AS stock_description, 
  GROUP_CONCAT(stock_submission.qty) AS qty, 
  GROUP_CONCAT(stock_submission.note) AS note,
  GROUP_CONCAT(stock_submission.stock_no) AS stock_no, 
  GROUP_CONCAT(stock_submission.id_detail_stock) AS id_detail_stock,
  GROUP_CONCAT(stocks.stock_description) AS stock_name,
  GROUP_CONCAT(stocks.stock_qty) AS stock_qty,
  GROUP_CONCAT(stocks.category) AS category 
FROM request_submission 
LEFT JOIN stock_submission ON request_submission.no_pengajuan = stock_submission.no_pengajuan
LEFT JOIN stocks ON stock_submission.stock_no = stocks.stock_no
WHERE request_submission.status = "Selesai"
AND request_submission.request_type = "SUBMISSION"
GROUP BY request_submission.no_pengajuan;
`;

  return pool.execute(SQLQuery);
};

const createItemRequest = (body) => {
  const SQLQuery = `INSERT INTO request_submission (id_req_sub, name_pt, name_division, approved_1, approved_2, post_user_id, post_username, post_date, no_pengajuan, request_type) VALUES (NULL, '${body.name_pt}', '${body.name_division}','${body.approved_1}', '${body.approved_2}', '${body.post_user_id}', '${body.post_username}', current_timestamp(), '${body.no_pengajuan}', '${body.request_type}');`;
  return pool.execute(SQLQuery);
};

const PostsubmissionItems = (values) => {
  const placeholders = values.map(() => "(?, ?, ?, ?, ?)").join(", ");
  const SQLQuery = `INSERT INTO stock_request (no_pengajuan, stock_no, stock_description, qty, note) VALUES ${placeholders};`;

  // Flattened values should include all values in the same order as the columns in the SQL statement
  const flattenedValues = values.reduce(
    (acc, value) =>
      acc.concat([
        value.no_pengajuan,
        value.stock_no,
        value.stock_description,
        value.qty,
        value.note,
      ]),
    []
  );

  return pool.execute(SQLQuery, flattenedValues);
};

module.exports = {
  getAllDataItemReq,
  getDataItemReqByUsername,
  createItemRequest,
  PostsubmissionItems,
  // request stock
  getAllDataReqSubandStockRequest,
  getAllDataReqSubandStockRequestById,
  getAllDataReqSubandStockRequestByStatus,
  // submission stock
  getAllDataReqSubandStockSubmission,
  getAllDataReqSubandStockSubmissionById,
  getAllDataReqSubandStockSubmissionByStatus,
};


const sendEmailToManagers = async (idItemReq) => {
   try {
     const dataPengajuan = await userFix.getReqSubById2(idItemReq);
 
     console.log("data pengajuan ", dataPengajuan);
 
     if (!dataPengajuan) {
       console.error("Pengajuan not found for idItemReq:", idItemReq);
       return;
     }
 
     const dataBarang = await createFix.getDataBarangByTypeRequest(
       dataPengajuan.request_type,
       dataPengajuan.no_pengajuan
     );
 
     const stocks = await stockFix.getStockByStockNo2(dataBarang[0].stock_no);
     const stockDescription = console.log("mendapatkan stocks nya ", stocks);
     const admin = await authFix.getUserByUsername2(dataPengajuan.approved_1);
     const manager = await authFix.getUserByUsername2(dataPengajuan.approved_2);
     const user = await authFix.getUserByUsername2(dataPengajuan.post_username);
     const managerEmail = manager ? manager.email : null;
     console.log("manager", manager);
     const managerName = manager ? manager.full_name : null;
     const userEmail = user ? user.email : null;
     const userName = user ? user.full_name : null;
     const adminEmail = admin ? admin.email : null;
     const adminName = admin ? admin.full_name : null;
 
     console.log("admin full name", adminName);
     console.log("manager name", managerName);
     if (!managerEmail) {
       console.error(
         "Manager email not found for username:",
         dataPengajuan.approved_2
       );
       return;
     }
 
     const no_pengajuan = dataPengajuan.no_pengajuan;
 
     const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
       },
     });
     console.log("data barang ", dataBarang);
     const { stock_no, stock_description, qty, additional_info, note } =
       dataBarang[0];
 
     const mailOptions = {
       from: process.env.EMAIL_USER,
       to: managerEmail,
       cc: adminEmail,
       subject: `Pengajuan Barang IT - pengaju ${userName} `,
       text: `
       Dear mr/mrs ${managerName}
 
 
       Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${userName} atas barang  ${stock_description} pada tanggal ${showFormattedDate(
         dataPengajuan.post_approved_1
       )} telah disetujui oleh Bagian IT,
       
       Detail Pengajuan: 
       No: ${dataPengajuan.no_pengajuan},
       Stock No: ${stock_no}, 
       nama pt: ${dataPengajuan.name_pt}, 
       nama division: ${dataPengajuan.name_division}, 
       Deskripsi Barang :${stocks.stock_description} - ${stock_description} 
       jumlah: ${qty} 
       ${note ? ` note: ${note}` : ""}
       ${additional_info ? ` Tambahan: ${additional_info}` : ""}
   
       Terima kasih telah menggunakan layanan kami.
       Best Regards 
       System Administrator
       `,
     };
 
     const info = await transporter.sendMail(mailOptions);
     console.log("Email to manager sent:", info.response);
   } catch (error) {
     console.error("Error sending email to manager:", error);
   }
 };