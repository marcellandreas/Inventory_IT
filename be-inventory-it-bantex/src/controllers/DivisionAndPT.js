const DivPtModels = require("../models/DivAndPT");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const divisionAndPT = new DivPtModels(dbConfig);
const sendErrorRes = (res, statusCode, message, error) => {
  res
    .status(statusCode)
    .json({ success: false, message, error: error.message });
};

const sendSuccessRes = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message, data });
};
exports.getAllDataPT = (req, res) => {
  divisionAndPT.getAllDataPt((error, data) => {
    if (error) {
      res
        .status(500)
        .json({ message: "Gagal mengambil data pt", error: error.message });
    } else {
      if (!divisionAndPT) {
        res.status(400).json({ message: "Tidak menemukan data pt" });
      } else {
        res.status(200).json({ message: "Berhasil mengambil data pt", data });
      }
    }
  });
};

// Membuat kategori baru
exports.createPt = (req, res) => {
  const ptData = {
    name_pt: req.body.name_pt,
  };

  divisionAndPT.createPt(ptData, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: "pt created", id: result.insertId });
  });
};

// Mendapatkan kategori berdasarkan ID
exports.getPtById = (req, res) => {
  const { id } = req.params;
  divisionAndPT.getPtById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mengambil Data Item Berdasarkan Id", data });
    }
  });
};
// Mengupdate kategori berdasarkan ID
exports.updatePt = (req, res) => {
  const ptId = req.params.id;
  const ptData = {
    name_pt: req.body.name_pt,
  };

  divisionAndPT.updatePt(ptId, ptData, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "pt not found" });
    }
    res.status(200).json({
      message: "pt updated",
      data: {
        id: ptId,
        name_pt: ptData.name_pt,
      },
    });
  });
};
// Menghapus kategori berdasarkan I
exports.deletePt = (req, res) => {
  const ptId = req.params.id;

  divisionAndPT.deletePt(ptId, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ error: "pt not found" });
    } else {
      res.status(200).json({
        message: "pt berhasil dihapus",
        data: {
          id: ptId,
        },
      });
    }
  });
};

exports.getDivisionByNamePt = (req, res) => {
  const { name_pt } = req.params;
  divisionAndPT.getItemById(name_pt, (error, divPt) => {
    if (error) {
      res.status(500).json({
        error: error.message,
        message: "Gagal mengambil division berdasarkan PT",
      });
    } else if (!divPt) {
      res.status(404).json({
        message: "Data tidak ditemukan",
      });
    } else {
      res.status(200).json({
        message: "Berhasil mengambil division berdasarkan PT",
        data: divPt,
      });
    }
  });
};

exports.createDivision = (req, res) => {
  const ptData = {
    name_pt: req.body.name_pt,
    name_division: req.body.name_division,
  };

  // Menambahkan validasi di sini
  divisionAndPT.checkDuplicateDivision(ptData, (error, duplicate) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (duplicate) {
      return res
        .status(400)
        .json({ error: "Duplicate division name for the same PT" });
    }

    // Jika tidak ada duplikasi, lanjutkan dengan menambahkan division
    divisionAndPT.createDivision(ptData, (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({ message: "division created", id: result.insertId });
    });
  });
};

exports.getDivisionById = (req, res) => {
  const { id } = req.params;
  divisionAndPT.getDivisionById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      sendSuccessRes(res, 404, "Tidak Menemukan Data");
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mengambil Data Item Berdasarkan Id", data });
    }
  });
};
// Mengupdate kategori berdasarkan ID
exports.updateDivision = (req, res) => {
  const divisionId = req.params.id;
  const divisionData = {
    name_pt: req.body.name_pt,
    name_division: req.body.name_division,
  };

  // Menambahkan validasi di sini
  divisionAndPT.checkDuplicateDivision(divisionData, (error, duplicate) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (duplicate) {
      return res
        .status(400)
        .json({ error: "Duplicate division name for the same PT" });
    }

    // Jika tidak ada duplikasi, lanjutkan dengan melakukan update
    divisionAndPT.updateDivision(divisionId, divisionData, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Division not found" });
      }
      res.status(200).json({
        message: "Division updated",
        data: {
          id: divisionId,
          name_pt: divisionData.name_pt,
          name_division: divisionData.name_division,
        },
      });
    });
  });
};

// Menghapus kategori berdasarkan I
exports.deleteDivision = (req, res) => {
  const divisionId = req.params.id;

  divisionAndPT.deleteDivision(divisionId, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ error: "pt not found" });
    } else {
      res.status(200).json({
        message: "division berhasil dihapus",
        data: {
          id: divisionId,
        },
      });
    }
  });
};
