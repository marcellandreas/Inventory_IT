const itemsModal = require("../models/Items");

// function get all data in table items
const getAllItems = async (req, res) => {
  try {
    const [data] = await itemsModal.getAllItems();
    res.json({
      message: "Berhasil Mengambil Data Barang",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getUnusedItemNo = async (req, res) => {
  try {
    const [data] = await itemsModal.getUnusedItemNo();
    res.json({
      message: "Berhasil Mengambil items yang belum terhubung",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// function get data by id in table items
const getItemById = async (req, res) => {
  const { id } = req.params;
  let isFound = false;
  try {
    const [data] = await itemsModal.getItemById(id);
    isFound = true;
    res.json({
      message: `Berhasil Mengambil Data Barang id ${id} `,
      data: data,
    });
  } catch (error) {
    if (!isFound) {
      res.status(404).json({
        message: "Data tidak ada",
      });
      return;
    }
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewItem = async (req, res) => {
  const { body } = req;
  try {
    await itemsModal.createNewItem(body);
    res.json({
      message: "Berhasil Membuat Data Barang Baru",
      data: body,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await itemsModal.updateItem(body, id);
    res.json({
      message: "Data User berhasil diubah",
      data: {
        id_user: id,
        ...body,
      },
    });
  } catch (error) {
    console.log(error, body);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// const updateItem = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;

//   try {
//     const updatedItem = await itemsModal.updateItem(body, id);

//     // Cek apakah barang telah diperbarui
//     if (updatedItem) {
//       res.json({
//         message: "Data Barang berhasil diubah",
//         data: updatedItem,
//       });
//     } else {
//       res.status(404).json({
//         message: "Data Barang tidak ditemukan",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       serverMessage: error,
//     });
//   }
// };

const delateItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await itemsModal.deleteItem(id);
    res.json({
      message: "Data Barang berhasil dihapus",
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
  getAllItems,
  getItemById,
  getUnusedItemNo,
  delateItem,
  updateItem,
  createNewItem,
};
