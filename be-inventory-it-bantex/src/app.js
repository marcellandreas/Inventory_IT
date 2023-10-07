require("dotenv").config();
const express = require("express");
const bodyParse = require("body-parser");

const app = express();
app.use(bodyParse.json());
const cors = require("cors");
// Middleware to parse JSON request
app.use(express.json());
// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Middleware access allow Domain And Method
app.use(
  cors({
    origin: "*", // Allow requests from this domain
    methods: "GET,PUT,POST,DELETE", // Allow these HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    ], // Allow only these headers
  })
);

// Feature Sing Up Users Auth
const AuthUsers = require("./routes/Auth");
// Feature users shema
const DataUsers = require("./routes/Users");
// Feature Stocks
const DataStocks = require("./routes/Stocks");
const DataItems = require("./routes/Items");
const DataPcMaster = require("./routes/PcMaster");
const DataPcLine = require("./routes/PcLine");

// Routes Sign Up
app.use("/api", AuthUsers);
app.use("/users", DataUsers);
app.use("/stocks", DataStocks);
app.use("/items", DataItems);
app.use("/pcmaster", DataPcMaster);
app.use("/pcline", DataPcLine);

const PORT = process.env.PORT || 4000;
const HOST = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

// Call database

// Memanggil Server
app.listen(PORT, HOST, () => {
  console.log(`Server run on port: ${PORT}`);
});

// pool.getConnection((err) => {
// 	if (err) {
// 	  console.log(err);
// 	  process.exit(1);
// 	}

// 	console.log("Database connected");
// });
