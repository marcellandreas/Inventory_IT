const pool = require("../config/database");
const { nanoid } = require("nanoid");

const getAllPcLine = () => {
  const SQLQuery = `SELECT p.*,p.pc_no ,i.item_no, i.item_description, i.unit, i.brand, i.note, i.date_registation, i.item_specification FROM pc_linee p INNER JOIN items i ON p.item_no = i.item_no;
  `;

  return pool.execute(SQLQuery);
};

const getDataPcLineByPcNo = (pcno) => {
  const SQLQuery = `SELECT p.*, i.item_no, i.item_description, i.unit, i.brand, i.note, i.date_registation, i.item_specification FROM pc_linee p INNER JOIN items i ON p.item_no = i.item_no WHERE p.pc_no = '${pcno}';`;
  return pool.execute(SQLQuery);
};

const createPcLine = (body) => {
  const SQLQuery = `INSERT INTO pc_linee (pc_no, item_no, post_user_id,post_username,post_date) VALUES ('${body.pc_no}', '${body.item_no}', '${body.post_id_user}', '${body.post_username}', current_timestamp());`;
  return pool.execute(SQLQuery);
};

const delettPcLine = (item_no) => {
  const SQLQuery = `DELETE FROM pc_linee WHERE pc_linee.item_no = '${item_no}'`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllPcLine,
  createPcLine,
  getDataPcLineByPcNo,
  delettPcLine,
};
