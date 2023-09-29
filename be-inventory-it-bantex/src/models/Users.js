const pool = require("../config/database");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM user";

  return pool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
};
