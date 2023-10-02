const pool = require("../config/database");
const nanoid = require("nanoid");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM user";
  return pool.execute(SQLQuery);
};

const getDataById = (id) => {
  const SQLQuery = `SELECT * FROM user WHERE id_user = ${id}`;
  return pool.execute(SQLQuery);
};

const createNewUser = async (body) => {
  const SQLQuery = `INSERT INTO user (code_user, username, password, email, role) VALUES ('${body.code_user}','${body.username}','${body.password}','${body.email}','${body.role}') `;
  return pool.execute(SQLQuery);
};

const updateUser = async (body, id) => {
  const SQLQuery2 = `UPDATE user SET code_user = '${body.code_user}', username = '${body.username}', password = '${body.password}', email = '${body.email}', role = '${body.role}' WHERE id_user = '${id}'`;
  return pool.execute(SQLQuery2);
};

const deleteuser = async (id) => {
  const SQLQuery = `DELETE FROM user WHERE user.id_user=${id}`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  getDataById,
  createNewUser,
  updateUser,
  deleteuser,
};
