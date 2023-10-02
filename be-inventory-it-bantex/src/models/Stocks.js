const pool = require("../config/database");

const getAllStock = () => {
  const SQLQuery = `SELECT * FROM stocks`;
  return pool.execute(SQLQuery);
};

const getStockById = (id) => {
  const SQLQuery = `SELECT * FROM stocks WHERE id_stock = ${id}`;
  return pool.execute(SQLQuery);
};

const createNewStock = async (body) => {
  const SQLQuery = `INSERT INTO stocks ( name, brand, year, total, unit, _condition, _function, code_stock) VALUES ('${body.name}', '${body.brand}', '${body.year}', '${body.total}', '${body.unit}', '${body._condition}','${body._function}', '${body.code_stock}');`;

  return pool.execute(SQLQuery);
};

const updateStock = async (body, id) => {
  const SQLQuery = `UPDATE stocks SET name = '${body.name}', brand = '${body.brand}', year = '${body.year}', total = '${body.total}', unit = '${body.unit}', _condition = '${body._condition}', code_stock = '${body.code_stock}' WHERE id_stock = ${id}`;

  return pool.execute(SQLQuery);
};

const deleteStock = async (id) => {
  const SQLQuery = `DELETE FROM stocks WHERE stocks.id_stock = ${id}`;
  return pool.execute(SQLQuery);
};

module.exports = {
  getAllStock,
  getStockById,
  createNewStock,
  updateStock,
  deleteStock,
};
