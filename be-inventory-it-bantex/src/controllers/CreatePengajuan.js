const CreatePengajuanModel = require("../models/CreatePengajuan");
const UserModel = require("../models/AuthModel");
const { showFormattedDate } = require("../helpers/formatData");
const StockModel = require("../models/Stocks");
const nodemailer = require("nodemailer");
const FormPengajuan = require("../models/FormPengajuan");
const AuthModels = require("../models/AuthModel");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const authFix = new AuthModels(dbConfig);

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
  const manager = await authFix.getUserByUsername2(body.approved_2);
  const admin = await authFix.getUserByUsername2(body.approved_1);
  const managerName = manager ? manager.full_name : null;
  const adminName = admin ? admin.full_name : null;
  if (!user) {
    console.error("User not found");
    return;
  }

  let dataBuatEmail;

  if (body.request_type === "REQUEST") {
    dataBuatEmail =
      await FormPengajuan.getAllDataReqSubandStockRequestBynoPengajuan(
        no_pengajuan
      );
  } else if (body.request_type === "SUBMISSION") {
    dataBuatEmail =
      await FormPengajuan.getAllDataReqSubandStockSubmissionBynoPengajuan(
        no_pengajuan
      );
  }

  const transformedData = dataBuatEmail[0].map((item) => ({
    no_pengajuan: item.no_pengajuan,
    name_pt: item.name_pt,
    name_division: item.name_division,
    status: item.status,
    approved_1: item.approved_1,
    approved_2: item.approved_2,
    post_user_id: item.post_user_id,
    post_username: item.post_username,
    post_date: item.post_date,
    date_approved_1: item.date_approved_1,
    date_approved_2: item.date_approved_2,
    date_done: item.date_done,
    request_type: item.request_type,
    submissionData:
      item.request_type === "REQUEST"
        ? (item.Id_submission_item || "").split(",").map((idSub, index) => ({
            Id_submission_item: idSub,
            stock_description: (item.stock_description || "").split(",")[index],
            qty: (item.qty || "").split(",")[index],
            note: (item.note || "").split(",")[index],
            stock_no: (item.stock_no || "").split(",")[index],
            id_detail_stock: (item.id_detail_stock || "").split(",")[index],
            stocks: {
              stock_name: (item.stock_name || "").split(",")[index],
              stock_qty: (item.stock_qty || "").split(",")[index],
              category: (item.category || "").split(",")[index],
            },
          }))
        : (item.id_stock_sub || "").split(",").map((idSub, index) => ({
            Id_submission_item: idSub,
            stock_description: (item.stock_description || "").split(",")[index],
            qty: (item.qty || "").split(",")[index],
            note: (item.note || "").split(",")[index],
            stock_no: (item.stock_no || "").split(",")[index],
            id_detail_stock: (item.id_detail_stock || "").split(",")[index],
            stocks: {
              stock_name: (item.stock_name || "").split(",")[index],
              stock_qty: (item.stock_qty || "").split(",")[index],
              category: (item.category || "").split(",")[index],
            },
          })),
  }));

  const userEmail = user.email;
  const userName = user.full_name;

  // Konfigurasi transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { name_pt, name_division } = body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Pengajuan Barang IT ",
    text: `Hai ${userName},\n\nPengajuan Barang IT dengan nomor ${no_pengajuan} telah berhasil dibuat.\n\n

    Detail Pengajuan:
    No: ${no_pengajuan},
    Nama PT: ${name_pt},
    Nama Division: ${name_division},
    
    Barang-barang yang diajukan:
    ${transformedData[0].submissionData
      .map((item, index) => {
        const { stock_description, qty, note, stock_no } = item;
        return `
      - Stock No: ${stock_no},
        Deskripsi Barang: ${item.stocks.stock_name},  ${stock_description},
        Jumlah: ${qty},
        ${note ? `Note: ${note}` : ""}
      `;
      })
      .join("\n")}
   
    Pengajuan akan di tujuan kepada Bagian IT ${adminName} dan Manager ${managerName}
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

const sendEmailToAdmin = async (
  no_pengajuan,
  body,
  adminEmail,
  adminName,
  userFullName
) => {
  try {
    const dataBarang = await pengajuan.getDataBarangByTypeRequest(
      body.request_type,
      no_pengajuan
    );

    if (dataBarang.length > 0) {
      let dataBuatEmail;

      if (body.request_type === "REQUEST") {
        dataBuatEmail =
          await FormPengajuan.getAllDataReqSubandStockRequestBynoPengajuan(
            no_pengajuan
          );
      } else if (body.request_type === "SUBMISSION") {
        dataBuatEmail =
          await FormPengajuan.getAllDataReqSubandStockSubmissionBynoPengajuan(
            no_pengajuan
          );
      }

      const transformedData = dataBuatEmail[0].map((item) => ({
        no_pengajuan: item.no_pengajuan,
        name_pt: item.name_pt,
        name_division: item.name_division,
        status: item.status,
        approved_1: item.approved_1,
        approved_2: item.approved_2,
        post_user_id: item.post_user_id,
        post_username: item.post_username,
        post_date: item.post_date,
        date_approved_1: item.date_approved_1,
        date_approved_2: item.date_approved_2,
        date_done: item.date_done,
        request_type: item.request_type,
        submissionData:
          item.request_type === "REQUEST"
            ? (item.Id_submission_item || "")
                .split(",")
                .map((idSub, index) => ({
                  Id_submission_item: idSub,
                  stock_description: (item.stock_description || "").split(",")[
                    index
                  ],
                  qty: (item.qty || "").split(",")[index],
                  note: (item.note || "").split(",")[index],
                  stock_no: (item.stock_no || "").split(",")[index],
                  id_detail_stock: (item.id_detail_stock || "").split(",")[
                    index
                  ],
                  stocks: {
                    stock_name: (item.stock_name || "").split(",")[index],
                    stock_qty: (item.stock_qty || "").split(",")[index],
                    category: (item.category || "").split(",")[index],
                  },
                }))
            : (item.id_stock_sub || "").split(",").map((idSub, index) => ({
                Id_submission_item: idSub,
                stock_description: (item.stock_description || "").split(",")[
                  index
                ],
                qty: (item.qty || "").split(",")[index],
                note: (item.note || "").split(",")[index],
                stock_no: (item.stock_no || "").split(",")[index],
                id_detail_stock: (item.id_detail_stock || "").split(",")[index],
                stocks: {
                  stock_name: (item.stock_name || "").split(",")[index],
                  stock_qty: (item.stock_qty || "").split(",")[index],
                  category: (item.category || "").split(",")[index],
                },
              })),
      }));

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const { name_pt, name_division, post_date } = body;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: `Pengajuan Barang IT Bantex Indonesia, pengaju ${userFullName}`,
        text: `Dear mr/mrs ${adminName}

        Kamu mempunyai Permintaan persetujuan dengan nomor seri ${no_pengajuan} diajukan oleh user: ${userFullName} pada divisi ${name_division} pada tanggal ${showFormattedDate(
          post_date
        )} 
        
        Detail Pengajuan:
        No: ${no_pengajuan},
        Nama PT: ${name_pt},
        Nama Division: ${name_division},
        
        Barang-barang yang diajukan:
        ${transformedData[0].submissionData
          .map((item, index) => {
            const { stock_description, qty, note, stock_no } = item;
            return `
          - Stock No: ${stock_no},
            Deskripsi Barang: ${item.stocks.stock_name},  ${stock_description},
            Jumlah: ${qty},
            ${note ? `Note: ${note}` : ""}
          `;
          })
          .join("\n")}

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

        try {
          await sendEmail(no_pengajuan, body);
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }

        const adminUsername = body.approved_1;
        const penggunaUserName = body.post_username;
        try {
          const admin = await userModel.getAdminByEmail(adminUsername);
          const USER = await userModel.getAdminByEmail(penggunaUserName);
          if (admin && USER) {
            await sendEmailToAdmin(
              no_pengajuan,
              body,
              admin.email,
              admin.full_name,
              USER.full_name
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
