const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
