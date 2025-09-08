const API = require("../model/product");

exports.createData = async (req, res) => {
  try {
    const data = req.body;

    if (req.files && Array.isArray(req.files)) {
      data.images = req.files.map((file) => file.filename);
    } else if (req.file) {
      data.images = req.file.filename;
    }

    const addData = await API.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Data Added Successfully",
      data: addData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.viewData = async (req, res) => {
  try {
    const viewData = await API.find();
    res.status(200).json({
      status: "success",
      message: "Data Found Successfully",
      data: viewData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const deleteId = req.params.id;

    const checkData = await API.findById(deleteId);
    if (!checkData) throw new Error("Data Not Found");

    const deleteData = await API.findByIdAndDelete(deleteId);
    res.status(200).json({
      status: "success",
      message: "Product Deleted Successfully",
      data: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.editData = async (req, res) => {
  try {
    const editId = req.params.id;
    const data = req.body;

    checkData = await API.findById(editId);
    if (!checkData) throw new Error("Data Not Found");

    const updateData = await API.findByIdAndUpdate(editId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Product Detail Edit Successfully",
      data: updateData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
