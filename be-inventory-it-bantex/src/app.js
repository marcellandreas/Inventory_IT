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
const DataDivisionAndPT = require("./routes/DivisionAndPT");
const DataFormPengajuan = require("./routes/FormPengajuan");

let currentMonth = new Date().getMonth() + 1; // Bulan saat ini (dalam angka)
let currentYear = new Date().getFullYear(); // Tahun saat ini
let currentCounter = 1; // Nomor urut awal

// Mengatasi perubahan bulan
const handleMonthChange = () => {
  const now = new Date();
  const newMonth = now.getMonth() + 1;
  if (newMonth !== currentMonth) {
    currentMonth = newMonth;
    currentCounter = 1; // Reset nomor urut
  }
};

app.post("/submit", (req, res) => {
  handleMonthChange(); // Memeriksa perubahan bulan

  // Membuat no_pengajuan dengan format IT/bulan sekarang/tahun sekarang/nomor urut
  const no_pengajuan = `IT/${currentMonth}/${currentYear}/${currentCounter
    .toString()
    .padStart(3, "0")}`;
  currentCounter++; // Tingkatkan nomor urut

  // Di sini Anda dapat menyimpan data no_pengajuan dan data lain yang diterima dari body permintaan POST ke database atau tempat penyimpanan yang sesuai

  res.json({ no_pengajuan });
});

// Routes Sign Up
app.use("/api", AuthUsers);
app.use("/users", DataUsers);
app.use("/stocks", DataStocks);
app.use("/items", DataItems);
app.use("/pcmaster", DataPcMaster);
app.use("/pcline", DataPcLine);
app.use("/app", DataDivisionAndPT);
app.use("/pengajuan", DataFormPengajuan);

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
