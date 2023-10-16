const pool = require("../config/database");

const getAllDataItemReq = () => {
  const SQLQuery = `SELECT * FROM items_request`;
  return pool.execute(SQLQuery);
};

const getDataItemReqByUsername = (username) => {
  const SQLQuery = `SELECT items_request.* FROM items_request JOIN user ON items_request.post_username = user.username WHERE user.username = '${username}';`;
  return pool.execute(SQLQuery);
};

const getAllDataPengajuan = () => {
  const SQLQuery = `SELECT 
    items_request.no_pengajuan, 
    items_request.name_pt, 
    items_request.name_division, 
    items_request.item_req_date, 
    items_request.applicant, 
    items_request.approved_1, 
    items_request.approved_2, 
    items_request.post_user_id, 
    items_request.post_username, 
    items_request.post_date, 
    GROUP_CONCAT(submission_items.sub_no) AS sub_no, 
    GROUP_CONCAT(submission_items.stock_description) AS stock_description, 
    GROUP_CONCAT(submission_items.qty) AS qty, 
    GROUP_CONCAT(submission_items.note) AS note, 
    GROUP_CONCAT(submission_items.stock_no) AS stock_no 
  FROM items_request 
  LEFT JOIN form_request_items ON items_request.no_pengajuan = form_request_items.no_pengajuan LEFT JOIN submission_items ON form_request_items.sub_no = submission_items.sub_no 
  GROUP BY items_request.no_pengajuan;`;
  return pool.execute(SQLQuery);
};

const getDataAllPengajuanByIdForm = (id_item_req) => {
  const SQLQuery = `SELECT 
  items_request.no_pengajuan, 
  items_request.name_pt, 
  items_request.name_division, 
  items_request.item_req_date, 
  items_request.applicant, 
  items_request.approved_1, 
  items_request.approved_2, 
  items_request.post_user_id,  
  items_request.post_username, 
  items_request.post_date, 
  GROUP_CONCAT(submission_items.sub_no) AS sub_no, 
  GROUP_CONCAT(submission_items.stock_description) AS stock_description, 
  GROUP_CONCAT(submission_items.qty) AS qty , 
  GROUP_CONCAT(submission_items.note) AS note, 
  GROUP_CONCAT(submission_items.stock_no) AS stock_no 
  FROM items_request 
  LEFT JOIN form_request_items ON items_request.no_pengajuan = form_request_items.no_pengajuan LEFT JOIN submission_items ON form_request_items.sub_no = submission_items.sub_no 
  WHERE items_request.id_item_req = ${id_item_req} 
  GROUP BY items_request.no_pengajuan;`;
  return pool.execute(SQLQuery);
};

const postItemReq = (body) => {
  const SQLQuery = `INSERT INTO items_request (id_item_req, name_pt, name_division, item_req_date, applicant, approved_1, approved_2, post_user_id, post_username, post_date, no_pengajuan) VALUES (NULL, '${body.name_pt}', '${body.name_division}', '${body.item_req_date}', '${body.applicant}', '${body.approved_1}', '${body.approved_2}', '${body.post_user_id}', '${body.post_username}', current_timestamp(), '${body.no_pengajuan}');`;
  return pool.execute(SQLQuery);
};

const PostsubmissionItems = (values) => {
  const placeholders = values.map(() => "(?, ?, ?, ?, ?)").join(", ");
  const SQLQuery = `INSERT INTO submission_items (sub_no, stock_no, stock_description, qty, note) VALUES ${placeholders};`;

  // Flattened values should include all values in the same order as the columns in the SQL statement
  const flattenedValues = values.reduce(
    (acc, value) =>
      acc.concat([
        value.sub_no,
        value.stock_no,
        value.stock_description,
        value.qty,
        value.note,
      ]),
    []
  );

  return pool.execute(SQLQuery, flattenedValues);
};

// Surat Pengajuan atau Form Request Items

const postSuratPengajuan = (values) => {
  const placeholders = values.map(() => "(?, ?, ?)").join(", ");

  const SQLQuery = `INSERT INTO form_request_items (id, no_pengajuan, sub_no) VALUES ${placeholders};`;
  const flattenedValues = values.reduce(
    (acc, value) => acc.concat([null, value.no_pengajuan, value.sub_no]),
    []
  );
  return pool.execute(SQLQuery, flattenedValues);
};

const deleteSuratPengajuan = (id_surat) => {
  const SQLQuery = `DELETE FROM form_request_items WHERE form_request_items.id = ${id_surat}`;
  return pool.execute(SQLQuery);
};

const deleteFormRequestItems = (no_pengajuan) => {
  const SQLQuery = `DELETE FROM form_request_items WHERE no_pengajuan = '${no_pengajuan}';`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllDataItemReq,
  getAllDataPengajuan,
  getDataItemReqByUsername,
  getDataAllPengajuanByIdForm,
  postItemReq,
  PostsubmissionItems,
  postSuratPengajuan,
  deleteSuratPengajuan,
  deleteFormRequestItems,
};
