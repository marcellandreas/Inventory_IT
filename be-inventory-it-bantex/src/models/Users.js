const pool = require("../config/database");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM user";

  return pool.execute(SQLQuery);
};

const createNewUser = async (body) => {
  const id = await import("nanoid");
  const SQLQuery = `INSERT INTO user (id_user, code_user, username, password, email, role) VALUES ('${id}','${body.code_user}','${body.username}','${body.password}','${body.email}','${body.role}') `;

  return pool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  createNewUser,
};
