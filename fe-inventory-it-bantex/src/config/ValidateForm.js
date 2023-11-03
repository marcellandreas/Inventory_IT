export const validateFormDataItems = (formValues) => {
  const errors = [];

  if (formValues.item_no === "") {
    errors.push("Item no. harus diisi");
  }
  if (formValues.item_description === "") {
    errors.push("Deskripsi item harus diisi");
  }
  if (formValues.unit === "") {
    errors.push("Unit harus diisi");
  }
  if (formValues.category === "") {
    errors.push("Category item harus diisi");
  }
  if (formValues.brand === "") {
    errors.push("Brand harus diisi");
  }
  if (formValues.item_location === "") {
    errors.push("lokasi item harus diisi");
  }
  if (formValues.date_registation === "") {
    errors.push("Tanggal Registrasi harus diisi");
  }
  if (formValues.kondisi === "") {
    errors.push("kondisi harus diisi");
  }
  if (formValues.item_specification === "") {
    errors.push("Spesifikasi item harus diisi");
  }
  return errors;
};
export const validateFormDataStock = (formValues) => {
  const errors = [];

  if (formValues.stock_description === "") {
    errors.push("Nama Barang. harus diisi");
  }
  if (formValues.stock_qty === "") {
    errors.push("Jumlah harus diisi");
  }
  if (formValues.unit === "") {
    errors.push("Satuan harus diisi");
  }
  if (formValues.category === "") {
    errors.push("Kategory item harus diisi");
  }
  if (formValues.type === "") {
    errors.push("Tipe harus diisi");
  }

  return errors;
};
export const validateFormDataPcMaster = (formValues) => {
  const errors = [];

  if (formValues.pc_no === "") {
    errors.push("PC Number harus diisi");
  }
  if (formValues.pc_description === "") {
    errors.push("Pc Description  harus diisi");
  }
  if (formValues.unit === "") {
    errors.push("unit harus diisi");
  }
  if (formValues.category === "") {
    errors.push("Catagory harus diisi");
  }
  if (formValues.status === "") {
    errors.push("Status harus diisi");
  }
  if (formValues.pc_location === "") {
    errors.push("Pc Location harus diisi");
  }
  if (formValues.note === "") {
    errors.push("Note harus diisi");
  }
  if (formValues.date_registation === "") {
    errors.push("Date Registation harus diisi");
  }
  if (formValues.pc_spectification === "") {
    errors.push("Pc Spectification harus diisi");
  }

  return errors;
};
export const validateFormDataAuth = (formValues) => {
  const errors = [];

  if (formValues.code_user === "") {
    errors.push("code_user harus diisi");
  }
  if (formValues.username === "") {
    errors.push("username  harus diisi");
  }

  if (formValues.password === "") {
    errors.push("password harus diisi");
  }

  return errors;
};

export const validateFormTakeItem = (formValues, data) => {
  const errors = {};

  if (!formValues.stock_no) {
    errors.stock_no = "Nomor Stok harus diisi";
  }
  if (!formValues.id_detail_stock) {
    errors.id_detail_stock = "Nama Stock harus diisi";
  }
  // if (!formValues.item_description) {
  //   errors.item_description = "qty kurang";
  // }
  if (!formValues.item_location) {
    errors.item_location = "Lokasi Item  harus diisi";
  }
  if (!formValues.date_registation) {
    errors.date_registation = "Date Register harus diisi";
  }
  if (!formValues.item_specification) {
    errors.item_specification = "Spesifikasi harus diisi";
  }

  // Lakukan validasi lain sesuai kebutuhan untuk input lainnya
  // Contoh:
  // if (!formValues.item_description) {
  //   errors.item_description = "Item Description harus diisi";
  // }

  return errors;
};
