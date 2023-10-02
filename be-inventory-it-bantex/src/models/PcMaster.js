const pool = require("../config/database");

const getAllPcMaster = () => {
  const SQLQuery = `SELECT * FROM pc_master`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllPcMaster,
};
