const pool = require("../config/database");
const { nanoid } = require("nanoid");

const getAllDataItemReq = () => {
  const SQLQuery = `SELECT * FROM items_request`;
  return pool.execute(SQLQuery);
};

const postItemReq = (body) => {
  const SQLQuery = `INSERT INTO items_request (id_item_req, name_pt, name_division, item_req_date, approved_1, approved_2, post_user_id, post_username, post_date, no_pengajuan) VALUES (NULL, '${body.name_pt}', '${body.name_division}', '${body.item_req_date}', '${body.approved_1}', '${body.approved_2}', '${body.post_user_id}', '${body.post_username}', current_timestamp(), '${body.no_pengajuan}');`;
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

module.exports = {
  postItemReq,
  getAllDataItemReq,
  PostsubmissionItems,
  postSuratPengajuan,
  deleteSuratPengajuan,
};
