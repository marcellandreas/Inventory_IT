const usersModel = require("../models/Users");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await usersModel.getAllUsers();
    res.json({
      message: "GET all users success",
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
      message: "CREATE new users",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = { getAllUsers, createNewUser };
