const pool = require("../config/database");

const getAllPcMaster = () => {
  const SQLQuery = `SELECT * FROM pc_master`;
  return pool.execute(SQLQuery);
};

const getPcMasterById = (id) => {
  const SQLQuery = `SELECT * FROM pc_master WHERE id_pc_master = ${id}`;
  return pool.execute(SQLQuery);
};

const getPcMasterByPcMaster = (pcno) => {
  const SQLQuery = `SELECT * FROM pc_master WHERE pc_no = '${pcno}'`;

  return pool.execute(SQLQuery);
};

const createPcMaster = (body) => {
  const SQLQuery = `INSERT INTO pc_master ( pc_no, pc_description, unit, category, status, pc_location, note, date_registation, date_expired, pc_spectification, post_user_id, post_username, post_date) VALUES ('${body.pc_no}', '${body.pc_description}', '${body.unit}', '${body.category}', '${body.status}', '${body.pc_location}', '${body.note}', '${body.date_registation}', '${body.date_expired}', '${body.pc_spectification}', '${body.post_user_id}', '${body.post_username}', current_timestamp())`;
  return pool.execute(SQLQuery);
};

const UpdatePcMaster = (body, id) => {
  const SQLQuery = `UPDATE pc_master SET pc_no = '${body.pc_no}', pc_description = '${body.pc_description}', unit = '${body.unit}', category = '${body.category}', status = '${body.status}', pc_location = '${body.pc_location}', note = '${body.note}', date_registation = '${body.date_registation}', date_expired = '${body.date_expired}', pc_spectification = '${body.pc_spectification}', post_user_id = '${body.post_user_id}', post_username = '${body.post_username}' WHERE pc_master.id_pc_master = ${id}`;
  return pool.execute(SQLQuery);
};

const deletePcMaster = async (id) => {
  const SQLQuery = `DELETE FROM pc_master WHERE pc_master.id_pc_master = ${id}`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllPcMaster,
  getPcMasterById,
  createPcMaster,
  getPcMasterByPcMaster,
  UpdatePcMaster,
  deletePcMaster,
};
