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
    methods: "GET,PUT,POST,DELETE,PATCH", // Allow these HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    ], // Allow only these headers
  })
);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// auth / login
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

// form Request (pengajuan barang)
const FormRequestRouter = require("./routes/requestSubmission");
app.use("/form", FormRequestRouter);

// requset items (pengajuan barang)
const StockRequestRouter = require("./routes/StockRequest");
app.use("/req-form", StockRequestRouter);

// submission items (pengajuan barang)
const StockSubmission = require("./routes/StockSubmission");
app.use("/sub-form", StockSubmission);

// category router
const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

// data users router
const DataUsers = require("./routes/Users");
app.use("/users", DataUsers);

const stockRouter = require("./routes/Stocks");
app.use("/stocks", stockRouter);

const detailStockRouter = require("./routes/StocksDetail");
app.use("/det-stock", detailStockRouter);

const detailStockTemporaryRouter = require("./routes/StocksDetailTemporary");
app.use("/det-temp-stock", detailStockTemporaryRouter);

const DataItems = require("./routes/Items");
app.use("/items", DataItems);

const DataPcMaster = require("./routes/PcMaster");
app.use("/pcmaster", DataPcMaster);

const DataPcLine = require("./routes/PcLine");
app.use("/pcline", DataPcLine);

const DataDivisionAndPT = require("./routes/DivisionAndPT");
app.use("/app", DataDivisionAndPT);

const DataFormPengajuan = require("./routes/FormPengajuan");
app.use("/pengajuan", DataFormPengajuan);

const createPengajuan = require("./routes/createPengajuan");
app.use("/createPengajuan", createPengajuan);

const PORT = 5001;
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
