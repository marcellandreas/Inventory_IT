const usersModel = require("../models/Users");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await usersModel.getAllUsers();
    res.json({
      message: "Berhasil Mengambil Data User",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getRoleUsers = async (req, res) => {
  try {
    const [data] = await usersModel.getRoleUsers();
    res.json({
      message: "Daftar Peran Pengguna Tanpa Duplikasi",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await usersModel.getDataById(id);
    res.json({
      message: "Berhasil Mengambil Data User Berdasarkan ID",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;
  try {
    await usersModel.createNewUser(body);
    res.json({
      message: "Berhasil Membuat User Baru",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await usersModel.updateUser(body, id);
    res.json({
      message: "Data User berhasil diubah",
      data: {
        id_user: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const delateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await usersModel.deleteuser(id);
    res.json({
      message: "Data Stock berhasil dihapus",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  getUserById,
  delateUser,
  getRoleUsers,
};
