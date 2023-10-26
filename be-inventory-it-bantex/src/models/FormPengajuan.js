const pool = require("../config/database");

const getAllDataItemReq = () => {
  const SQLQuery = `SELECT * FROM request_submission`;
  return pool.execute(SQLQuery);
};

const getDataItemReqByUsername = (username) => {
  const SQLQuery = `SELECT request_submission.* FROM request_submission JOIN user ON request_submission.post_username = user.username WHERE user.username = '${username}';`;
  return pool.execute(SQLQuery);
};

const getAllDataPengajuan = () => {
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
  GROUP_CONCAT(submission_items.Id_submission_item) AS Id_submission_item, 
  GROUP_CONCAT(submission_items.no_pengajuan) AS no_pengajuan, 
  GROUP_CONCAT(submission_items.stock_description) AS stock_description, 
  GROUP_CONCAT(submission_items.qty) AS qty, 
  GROUP_CONCAT(submission_items.note) AS note, 
  GROUP_CONCAT(submission_items.stock_no) AS stock_no 
FROM request_submission 
LEFT JOIN submission_items ON request_submission.no_pengajuan = submission_items.no_pengajuan 
GROUP BY request_submission.no_pengajuan;

  `;
  return pool.execute(SQLQuery);
};

const getDataAllPengajuanByIdForm = (id_item_req) => {
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
  GROUP_CONCAT(submission_items.Id_submission_item) AS Id_submission_item, 
  GROUP_CONCAT(submission_items.stock_description) AS stock_description, 
  GROUP_CONCAT(submission_items.qty) AS qty, 
  GROUP_CONCAT(submission_items.note) AS note, 
  GROUP_CONCAT(submission_items.stock_no) AS stock_no 
  FROM request_submission 
  LEFT JOIN submission_items ON request_submission.no_pengajuan = submission_items.no_pengajuan 
  WHERE request_submission.id_item_req = ${id_item_req} 
  GROUP BY request_submission.no_pengajuan;`;
  return pool.execute(SQLQuery);
};

const createItemRequest = (body) => {
  const SQLQuery = `INSERT INTO request_submission (id_item_req, name_pt, name_division, approved_1, approved_2, post_user_id, post_username, post_date, no_pengajuan, request_type) VALUES (NULL, '${body.name_pt}', '${body.name_division}','${body.approved_1}', '${body.approved_2}', '${body.post_user_id}', '${body.post_username}', current_timestamp(), '${body.no_pengajuan}', '${body.request_type}');`;
  return pool.execute(SQLQuery);
};

const PostsubmissionItems = (values) => {
  const placeholders = values.map(() => "(?, ?, ?, ?, ?)").join(", ");
  const SQLQuery = `INSERT INTO submission_items (no_pengajuan, stock_no, stock_description, qty, note) VALUES ${placeholders};`;

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
  getAllDataPengajuan,
  getDataItemReqByUsername,
  getDataAllPengajuanByIdForm,
  createItemRequest,
  PostsubmissionItems,
};
