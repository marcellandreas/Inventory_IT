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

const createPcLine = (values) => {
  const placeholders = values
    .map(() => "(?, ?, ?, ?, current_timestamp())")
    .join(", ");
  const SQLQuery = `INSERT INTO pc_linee (pc_no, item_no, post_user_id, post_username, post_date) VALUES ${placeholders};`;
  const flattenedValues = values.reduce(
    (acc, value) =>
      acc.concat([
        value.pc_no,
        value.item_no,
        value.post_user_id,
        value.post_username,
      ]),
    []
  );
  return pool.execute(SQLQuery, flattenedValues);
};

// const createPcLine = async (values) => {
//   const SQLQuery = `INSERT INTO pc_linee (pc_no, item_no, post_user_id, post_username, post_date)
//   VALUES
//     ${values.map((value) => `(?, ?, ?, ?, current_timestamp())`).join(", ")};`;

//   const results = await pool.execute(SQLQuery, values);

//   return results.rows;
// };

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
