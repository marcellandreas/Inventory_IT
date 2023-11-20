const PcMasterModel = require("../models/PcMaster");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const pcMaster = new PcMasterModel(dbConfig);

exports.getAllPcMaster = (req, res) => {
  pcMaster.getAllPcMaster((error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "Berhasil Mendapat Data PC Master", data });
    }
  });
};

exports.getPersonalComputer = (req, res) => {
  const { id } = req.params;

  pcMaster.getPersonalComputer(id, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      // If there's only one result, return the single object directly
      const pc = result[0];
      const transformedResult = {
        pc_no: pc.pc_no,
        pc_description: pc.pc_description,
        unit: pc.unit,
        category: pc.category,
        status: pc.status,
        pc_location: pc.pc_location,
        note: pc.note,
        date_registation: pc.date_registation,
        date_expired: pc.date_expired,
        pc_spectification: pc.pc_spectification,
        post_user_id: pc.post_user_id,
        post_username: pc.post_username,
        post_date: pc.post_date,
        pc_line: pc.item_no
          ? pc.item_no.split(",").map((item, index) => ({
              item_no: item,
              post_date: pc.post_date.split(",")[index],
            }))
          : [],
        items: pc.item_no
          ? pc.item_no.split(",").map((item, index) => ({
              item_no: item,
              item_description: pc.item_description.split(",")[index],
              unit: pc.item_unit.split(",")[index],
              brand: pc.item_brand.split(",")[index],
              category: pc.item_category.split(",")[index],
              status: pc.item_status.split(",")[index],
              kondisi: pc.item_kondisi.split(",")[index],
              item_location: pc.item_location.split(",")[index],
              note: pc.item_note.split(",")[index],
              date_registation: pc.item_registation.split(",")[index],
              date_expired: pc.item_expired.split(",")[index],
              item_spesification: pc.item_spesification.split(",")[index],
              post_user_id: pc.item_user_id.split(",")[index],
              post_username: pc.item_username.split(",")[index],
              post_date: pc.item_date.split(",")[index],
            }))
          : [],
      };

      res.status(200).json({
        message: "Berhasil Mendapat Data Personal Computer",
        data: transformedResult,
      });
    }
  });
};

exports.getPcMasterById = (req, res) => {
  const { id } = req.params;
  pcMaster.getPcMasterById(id, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      res
        .status(404)
        .json({ message: "Data tidak ada, masukan id pc master yang benar" });
    } else {
      res
        .status(200)
        .json({ message: `Berhasil Mengambil Data Barang id ${id}`, data });
    }
  });
};

exports.getPcMasterByPcNo = (req, res) => {
  const { pcno } = req.params;
  pcMaster.getPcMasterByPcMaster(pcno, (error, data) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (!data) {
      res
        .status(404)
        .json({ message: "Data tidak ada, masukan PC Number yang benar" });
    } else {
      res
        .status(200)
        .json({ message: `Berhasil Mengambil Data Barang pcno ${pcno}`, data });
    }
  });
};

exports.createPcMaster = (req, res) => {
  const { body } = req;
  pcMaster.createPcMaster(body, (error, code) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(201)
        .json({ message: "Berhasil Menambah PC Master", data: body });
    }
  });
};

exports.UpdatePcMaster = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  pcMaster.updatePcMaster(body, id, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "Data PC Master berhasil diubah", data: body });
    }
  });
};

exports.deletePcMaster = (req, res) => {
  const { id } = req.params;
  pcMaster.deletePcMaster(id, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(204)
        .json({ message: "Data PC Master berhasil dihapus", data: null });
    }
  });
};
