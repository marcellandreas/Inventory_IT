const CreatePengajuanModel = require("../models/CreatePengajuan");
const UserModel = require("../models/AuthModel"); // Gantilah dengan model User yang sesuai
const pool = require("../config/database");
const nodemailer = require("nodemailer");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const pengajuan = new CreatePengajuanModel(dbConfig);
const userModel = new UserModel(dbConfig); // Sesuaikan dengan model User yang sesuai

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
  console.log(body);
  console.log(user);

  const dataBarang = await pengajuan.getDataBarangByTypeRequest(
    body.request_type,
    no_pengajuan
  );

  console.log("");

  if (!user) {
    console.error("User not found");
    return;
  }

  const userEmail = user.email;

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
  const { stock_no, stock_description, qty, additional_info, note } =
    dataBarang;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Pengajuan Barang IT",
    text: `Hai ${userEmail},\n\nPengajuan Barang IT dengan nomor ${no_pengajuan} telah berhasil dibuat.\n\n
    Detail Pengajuan:\n
    No: ${no_pengajuan}, 
    Stock No: ${stock_no},
    nama pt: ${name_pt},
    nama division: ${name_division}, 
    Deskripsi Barang : ${stock_description}
    jumlah: ${qty}
    ${note ? ` note: ${note}` : null}
    ${additional_info ? ` Tambahan: ${additional_info}` : null}
    Pengajuan akan di tujuan kepada Bagian IT ${approved_1} dan Manager ${approved_2}
    Mohon di tunggu
    \n\nTerima kasih telah menggunakan layanan kami.\n\nSalam,\nTim Pengajuan Barang IT`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmailToAdmin = async (no_pengajuan, body, adminEmail) => {
  try {
    // Mendapatkan data barang
    const dataBarang = await pengajuan.getDataBarangByTypeRequest(
      body.request_type,
      no_pengajuan
    );

    // Memeriksa apakah dataBarang tidak undefined

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Extracting properties from body and dataBarang
    const { post_username, name_pt, name_division, request_type } = body;
    const { stock_no, stock_description, qty, additional_info, note } =
      dataBarang[0];

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `Pengajuan Barang IT Bantex Indonesia, pengaju ${post_username}`,
      text: `Pengajuan dengan nomor ${no_pengajuan} telah berhasil dibuat oleh username ${post_username} dengan email: ${adminEmail}. 
          Detail Pengajuan: 
          No: ${no_pengajuan},\n 
          Stock No: ${stock_no}, \n
          Nama PT: ${name_pt}, \n
          Nama Division: ${name_division}, \n 
          Deskripsi Barang: ${stock_description} \n
          Jumlah: ${qty} \n
          ${note ? `Note: ${note} \n` : ""}
          ${additional_info ? `Tambahan: ${additional_info} \n` : ""}
      \n\n\nDiharapkan Bagian IT dapat segera melakukan approved terkait pengajuan yang diajukan oleh ${post_username}, Terima Kasih`,
    };

    // Mengirim email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email to admin sent:", info.response);
  } catch (error) {
    console.error("Error sending email to admin:", error);
  }
};

// Panggil fungsi sendEmailToAdmin dengan parameter yang sesuai
// sendEmailToAdmin(no_pengajuan_value, body_value, adminEmail_value);

exports.createPengajuan = async (req, res) => {
  const { body } = req;

  pengajuan.createPengajuan(
    ...Object.values(body),
    async (error, no_pengajuan) => {
      if (error) {
        console.log(error);
        sendErrorRes(res, 500, "pengajuan gagal dibuat", error);
      } else {
        const data = { no_pengajuan, ...body };
        sendSuccessRes(res, 201, "pengajuan berhasil dibuat", data);

        await sendEmail(no_pengajuan, body);

        const adminUsername = body.approved_1;
        try {
          const admin = await userModel.getAdminByEmail(adminUsername);
          if (admin) {
            await sendEmailToAdmin(no_pengajuan, body, admin.email);
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

const sendEmailToManagers = async (idItemReq) => {
  try {
    const dataPengajuan = await userFix.getReqSubById2(idItemReq);

    if (!dataPengajuan) {
      console.error("Pengajuan not found for idItemReq:", idItemReq);
      return;
    }

    const dataBarang = await createFix.getDataBarangByTypeRequest(
      dataPengajuan.request_type,
      dataPengajuan.no_pengajuan
    );

    const stocks = await stockFix.getStockByStockNo2(dataBarang[0].stock_no);
    const stockDescription = console.log("mendapatkan stocks nya ", stocks);
    const admin = await authFix.getUserByUsername2(dataPengajuan.approved_1);
    const manager = await authFix.getUserByUsername2(dataPengajuan.approved_2);
    const user = await authFix.getUserByUsername2(dataPengajuan.post_username);
    const managerEmail = manager ? manager.email : null;
    console.log("manager", manager);
    const managerName = manager ? manager.full_name : null;
    const userEmail = user ? user.email : null;
    const userName = user ? user.full_name : null;
    const adminEmail = admin ? admin.email : null;
    const adminName = admin ? admin.full_name : null;

    console.log("admin full name", adminName);
    console.log("manager name", managerName);
    if (!managerEmail) {
      console.error(
        "Manager email not found for username:",
        dataPengajuan.approved_2
      );
      return;
    }

    const no_pengajuan = dataPengajuan.no_pengajuan;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log("data barang ", dataBarang);
    const { stock_no, stock_description, qty, additional_info, note } =
      dataBarang[0];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: managerEmail,
      cc: adminEmail,
      subject: `Pengajuan Barang IT - pengaju ${userName} `,
      text: `
Dear Mr/Mrs ${managerName},

Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${userName} atas barang  ${stock_description} pada tanggal ${showFormattedDate(
        dataPengajuan.post_approved_1
      )} telah disetujui oleh Bagian IT.

Detail Pengajuan:
No: ${dataPengajuan.no_pengajuan},
Nama PT: ${dataPengajuan.name_pt},
Nama Division: ${dataPengajuan.name_division},

Barang-barang yang diajukan:
${dataBarang
  .map((item, index) => {
    const { stock_no, stock_description, qty, additional_info, note } = item;
    return `
    - Stock No: ${stock_no},
      Deskripsi Barang:  ${stock_description},
      Jumlah: ${qty},
      ${note ? `Note: ${note}` : ""}
      ${additional_info ? `Tambahan: ${additional_info}` : ""}
    `;
  })
  .join("\n")}

Terima kasih telah menggunakan layanan kami.
Best Regards,
System Administrator
`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email to manager sent:", info.response);
  } catch (error) {
    console.error("Error sending email to manager:", error);
  }
};
