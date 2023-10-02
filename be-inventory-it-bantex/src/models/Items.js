const pool = require("../config/database");

const getAllItems = () => {
  const SQLQuery = `SELECT * FROM items`;
  return pool.execute(SQLQuery);
};

const getItemById = (id) => {
  const SQLQuery = `SELECT * FROM items WHERE id = ${id}`
  return pool.execute(SQLQuery)
}

const createNewItem = (body) => {
  const SQLQuery = `INSERT INTO items (item_no, item_description, unit, brand, status, item_location, note, date_registation, date_expired, item_specification) VALUES ('${body.item_no}', '${body.item_description}', '${body.unit}', '${body.brand}', '${body.status}', '${body.item_location}', '${body.note}', '${body.date_registation}', '${body.date_expired}', '${body.item_specification}')`;
  return pool.execute(SQLQuery);
};

const updateItem = (body, id) => {
  const SQLQuery = `UPDATE items SET 
                    item_no = '${body.item_no}', 
                    item_description = '${body.item_description}', 
                    unit = '${body.unit}', 
                    brand = '${body.brand}', 
                    status = '${body.status}', 
                    item_location = '${body.item_location}', 
                    note = '${body.note}', 
                    date_registation = '${body.date_registation}', 
                    date_expired = '${body.date_expired}', 
                    item_specification = '${body.item_specification}', 
                    post_user_id = '${body.post_user_id}', 
                    post_username='${body.psot_username}' 
                    WHERE items.id = ${id};`;
  return pool.execute(SQLQuery);
};

const deleteItem = (id) => {
  const SQLQuery = `DELETE FROM items WHERE id = ${id}`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllItems, getItemById,
  createNewItem,
  updateItem,
  deleteItem,
};
