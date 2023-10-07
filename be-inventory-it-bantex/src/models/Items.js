const pool = require("../config/database");
const { nanoid } = require("nanoid");

const getAllItems = () => {
  const SQLQuery = `SELECT * FROM items`;
  return pool.execute(SQLQuery);
};

const getItemById = (id) => {
  const SQLQuery = `SELECT * FROM items WHERE id = ${id}`;
  return pool.execute(SQLQuery);
};

const createNewItem = (body) => {
  // const id = nanoid(10);

  const SQLQuery = `INSERT INTO items (
     item_no, item_description, unit, category, brand, status, kondisi, item_location, note, date_registation, date_expired, item_specification, post_user_id, post_username
  )
  VALUES (
     '${body.item_no}', '${body.item_description}', '${body.unit}', '${body.category}', '${body.brand}', '${body.status}', '${body.kondisi}', '${body.item_location}', '${body.note}', '${body.date_registation}', '${body.date_expired}', '${body.item_specification}', '${body.post_user_id}', '${body.post_username}'
  );`;

  return pool.execute(SQLQuery);
};

const updateItem = (body, id) => {
  const SQLQuery = `UPDATE items SET item_no = '${body.item_no}', item_description = '${body.item_description}', unit = '${body.unit}', category = '${body.category}', brand = '${body.brand}', status = '${body.status}', kondisi = '${body.kondisi}', item_location = '${body.item_location}', note = '${body.note}', date_registation = '${body.date_registation}', date_expired = '${body.date_expired}', item_specification = '${body.item_specification}', post_user_id = '${body.post_user_id}', post_username = '${body.post_username}' WHERE id = '${id}'`;

  return pool.execute(SQLQuery);
};

const deleteItem = (id) => {
  const SQLQuery = `DELETE FROM items WHERE id = ${id}`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllItems,
  getItemById,
  createNewItem,
  updateItem,
  deleteItem,
};
