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
