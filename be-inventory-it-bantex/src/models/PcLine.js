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

module.exports = {
  getAllPcLine,
  getDataPcLineByPcNo,
};
