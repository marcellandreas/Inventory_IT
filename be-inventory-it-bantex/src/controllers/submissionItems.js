const SubmissionItems = require("../models/SubmissionItemModel");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_it",
};

const submissionItems = new SubmissionItems(dbConfig);
// Membuat entri baru submission items

exports.createSubmissionItems = (req, res) => {
  const submissionItemsData = req.body;
  submissionItems.createSubmissionItems(
    submissionItemsData,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(201).json({
          message: "Submission Items berhasil dibuat",
          data: submissionItemsData,
        });
      }
    }
  );
};

// Mendapatkan semua data submission items
exports.getAllSubmissionItems = (req, res) => {
  submissionItems.getAllSubmissionItems((error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ data: results });
    }
  });
};

// Mendapatkan data submission items berdasarkan ID
exports.getSubmissionItemsById = (req, res) => {
  const id_submission_item = req.params.id;
  submissionItems.getSubmissionItemsById(
    id_submission_item,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else if (results && results.length === 0) {
        res.status(404).json({ message: "Data Not Found" });
      } else {
        res.status(201).json({ data: results });
      }
    }
  );
};

// Mendapatkan data submission items berdasarkan sub_no
exports.getSubmissionItemsBySubNo = (req, res) => {
  const sub_no = req.params.sub_no;
  submissionItems.getSubmissionItemsBySubNo(sub_no, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Server Error", serverMessage: error });
    } else {
      res.status(200).json({ data: results });
    }
  });
};

// Memperbarui data submission items berdasarkan ID
exports.updateSubmissionItemsById = (req, res) => {
  const id_submission_item = req.params.id;
  const updatedData = req.body;
  submissionItems.updateSubmissionItemsById(
    id_submission_item,
    updatedData,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Data Submission Items berhasil diperbarui",
          data: results,
        });
      }
    }
  );
};

// Memperbarui data submission items berdasarkan sub_no
exports.updateSubmissionItemsBySubNo = (req, res) => {
  const sub_no = req.params.sub_no;
  const updatedData = req.body;
  submissionItems.updateSubmissionItemsBySubNo(
    sub_no,
    updatedData,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Data Submission Items berhasil diperbarui",
          data: results,
        });
      }
    }
  );
};

// Menghapus data submission items berdasarkan ID
exports.deleteSubmissionItemsById = (req, res) => {
  const id_submission_item = req.params.id;
  submissionItems.deleteSubmissionItemsById(
    id_submission_item,
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error });
      } else {
        res.status(200).json({
          message: "Data Submission Items berhasil dihapus",
          data: results,
        });
      }
    }
  );
};
