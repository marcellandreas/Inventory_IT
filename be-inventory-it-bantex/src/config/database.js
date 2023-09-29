// import database mysql
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "inventory_it",
  password: "",
});

module.exports = pool.promise();
