const CreatePengajuanModel = require("../models/CreatePengajuan");
const UserModel = require("../models/AuthModel");
const { showFormattedDate } = require("../helpers/formatData");
const StockModel = require("../models/Stocks");
const nodemailer = require("nodemailer");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const pengajuan = new CreatePengajuanModel(dbConfig);
const userModel = new UserModel(dbConfig);
const stockModel = new StockModel(dbConfig);

const sendErrorRes = (res, statusCode, message, error) => {
  res
    .status(statusCode)
    .json({ success: false, message, error: error.message });
};

const sendSuccessRes = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message, data });
};

const sendEmail = async (no_pengajuan, body) => {
  const userId = body.post_user_id;
  const user = await userModel.getUserById(userId);

  // const dataBarang = await pengajuan.getDataBarangByTypeRequest(
  //   body.request_type,
  //   no_pengajuan
  // );

  // console.log("aaa", dataBarang);

  if (!user) {
    console.error("User not found");
    return;
  }

  const userEmail = user.email;
  const userName = user.full_name;

  const appPassword = "ojlc htjm mkyo bzge";

  // Konfigurasi transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const {
    name_pt,
    name_division,
    approved_1,
    approved_2,
    post_username,
    request_type,
  } = body;
  // const { stock_no, stock_description, qty, note } = dataBarang[0];

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Pengajuan Barang IT ",
    text: `Hai ${userName},\n\nPengajuan Barang IT dengan nomor ${no_pengajuan} telah berhasil dibuat.\n\n
   
    Pengajuan akan di tujuan kepada Bagian IT ${approved_1} dan Manager ${approved_2}
    Mohon di tunggu
    
    Terima kasih telah menggunakan layanan kami.
    Best Regards 
    System Administrator`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmailToAdmin = async (no_pengajuan, body, adminEmail, adminName) => {
  try {
    // Mendapatkan data barang
    const dataBarang = await pengajuan.getDataBarangByTypeRequest(
      body.request_type,
      no_pengajuan
    );

    // Pastikan dataBarang tidak kosong sebelum melanjutkan
    if (dataBarang.length > 0) {
      // Mendapatkan dataStock setelah berhasil mendapatkan dataBarang
      const dataStock = await stockModel.getStockByStockNoEmail(
        dataBarang[0].stock_no
      );

      console.log(dataStock);

      // Email setup
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Extracting properties from body and dataBarang
      const { post_username, name_pt, name_division, request_type, post_date } =
        body;
      const { stock_no, stock_description, qty, note } = dataBarang[0];

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: `Pengajuan Barang IT Bantex Indonesia, pengaju ${post_username}`,
        text: `Dear mr/mrs ${adminName}

        Kamu mempunyai Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${post_username} pada divisi ${name_division} atas barang  ${stock_description} pada tanggal ${showFormattedDate(
          post_date
        )} 
        
        Detail Pengajuan:
        - Nomor: ${no_pengajuan}
        - Stock No: ${stock_no}
        - Nama PT: ${name_pt}
        - Nama Division: ${name_division}
        - Deskripsi Barang: ${
          dataStock?.stock_description
        }, ${stock_description}
        - Jumlah: ${qty}
        ${note ? `- Note: ${note}` : ""}

        Terima kasih telah menggunakan layanan kami.
        Best Regards 
        System Administrator
        `,
      };

      // Mengirim email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email to admin sent:", info.response);
    } else {
      console.error(
        "Data barang tidak ditemukan untuk nomor pengajuan:",
        no_pengajuan
      );
    }
  } catch (error) {
    console.error("Error sending email to admin:", error);
  }
};

exports.createPengajuan = async (req, res) => {
  const { body } = req;

  pengajuan.createPengajuan(
    ...Object.values(body),
    async (error, no_pengajuan) => {
      if (error) {
        sendErrorRes(res, 500, "pengajuan gagal dibuat", error);
      } else {
        const data = { no_pengajuan, ...body };
        sendSuccessRes(res, 201, "pengajuan berhasil dibuat", data);

        await sendEmail(no_pengajuan, body);

        const adminUsername = body.approved_1;
        try {
          const admin = await userModel.getAdminByEmail(adminUsername);
          if (admin) {
            await sendEmailToAdmin(
              no_pengajuan,
              body,
              admin.email,
              admin.full_name
            );
          } else {
            console.log("Admin not found");
          }
        } catch (adminError) {
          console.error("Error getting admin:", adminError);
        }
      }
    }
  );
};
