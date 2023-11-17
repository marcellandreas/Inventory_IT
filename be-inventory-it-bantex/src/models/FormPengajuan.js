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
  rs.id_item_req,
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
  GROUP_CONCAT(sr.id_detail_stock) AS id_detail_stock
FROM request_submission rs
LEFT JOIN stock_request sr ON rs.no_pengajuan = sr.no_pengajuan 
WHERE rs.request_type = "REQUEST"
GROUP BY rs.no_pengajuan;

  `;
  return pool.execute(SQLQuery);
};

const getAllDataReqSubandStockRequestById = (id_item_req) => {
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
  GROUP_CONCAT(stock_request.id_detail_stock) AS id_detail_stock 
  FROM request_submission 
  LEFT JOIN stock_request ON request_submission.no_pengajuan = stock_request.no_pengajuan 
  WHERE request_submission.id_item_req = ${id_item_req} 
  GROUP BY request_submission.no_pengajuan;`;
  return pool.execute(SQLQuery);
};
const getAllDataReqSubandStockRequestByStatus = (id_item_req) => {
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
  GROUP_CONCAT(stock_request.id_detail_stock) AS id_detail_stock 
  FROM request_submission 
  LEFT JOIN stock_request ON request_submission.no_pengajuan = stock_request.no_pengajuan 
  WHERE request_submission.status = "Selesai"
AND request_submission.request_type = "REQUEST"
  GROUP BY request_submission.no_pengajuan;`;
  return pool.execute(SQLQuery);
};

const getAllDataReqSubandStockSubmission = () => {
  const SQLQuery = `
  SELECT
  rs.id_item_req,
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
  GROUP_CONCAT(ss.stock_description) AS description,
  GROUP_CONCAT(ss.qty) AS qty,
  GROUP_CONCAT(ss.note) AS note
FROM request_submission rs
LEFT JOIN stock_submission ss ON rs.no_pengajuan = ss.no_pengajuan
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
  GROUP_CONCAT(stock_submission.id_detail_stock) AS id_detail_stock 
  FROM request_submission 
  LEFT JOIN stock_submission ON request_submission.no_pengajuan = stock_submission.no_pengajuan 
  WHERE request_submission.id_item_req = ${id_stock_sub} 
  GROUP BY request_submission.no_pengajuan;`;

  return pool.execute(SQLQuery);
};
const getAllDataReqSubandStockSubmissionByStatus = (status) => {
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
  GROUP_CONCAT(stock_submission.id_detail_stock) AS id_detail_stock 
FROM request_submission 
LEFT JOIN stock_submission ON request_submission.no_pengajuan = stock_submission.no_pengajuan 
WHERE request_submission.status = "Selesai"
AND request_submission.request_type = "SUBMISSION"
GROUP BY request_submission.no_pengajuan;
`;

  return pool.execute(SQLQuery);
};

const createItemRequest = (body) => {
  const SQLQuery = `INSERT INTO request_submission (id_item_req, name_pt, name_division, approved_1, approved_2, post_user_id, post_username, post_date, no_pengajuan, request_type) VALUES (NULL, '${body.name_pt}', '${body.name_division}','${body.approved_1}', '${body.approved_2}', '${body.post_user_id}', '${body.post_username}', current_timestamp(), '${body.no_pengajuan}', '${body.request_type}');`;
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
