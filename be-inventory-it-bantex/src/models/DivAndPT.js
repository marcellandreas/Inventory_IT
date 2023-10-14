const pool = require("../config/database");
const { nanoid } = require("nanoid");

const getAllDataPt = () => {
  const SQLQuery = `SELECT * FROM pt`;
  return pool.execute(SQLQuery);
};

const getDivisionByNamePt = (name_pt) => {
  const SQLQuery = `SELECT * FROM division WHERE name_pt = '${name_pt}';`;
  return pool.execute(SQLQuery);
};

// const deleteItem = (id) => {
//   const SQLQuery = `DELETE FROM items WHERE id = ${id}`;
//   return pool.execute(SQLQuery);
// };

module.exports = {
  getAllDataPt,
  getDivisionByNamePt,
};
