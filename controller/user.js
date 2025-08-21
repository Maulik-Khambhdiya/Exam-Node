const API = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.createData = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "maulik.cdmi@gmail.com",
        pass: "bwdrxgtkjddjctjr",
      },
    });

    // Wrap in an async IIFE so we can use await.
    const sendMail = async (email) => {
      const info = await transporter.sendMail({
        from: 'maulik.cdmi@gmail.com',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?", // plain‑text body
        html: "<b>Hello world?</b>", // HTML body
      });

      console.log("Message sent:", info.messageId);
    };

    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    data.profile = req.file.filename;
    sendMail(email)
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
      message: "Data Delete Successfully",
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

    const checkData = await API.findById(editId);
    if (!checkData) throw new Error("Data Not Found");

    const updateData = await API.findByIdAndUpdate(editId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Data Edit Successfully",
      data: updateData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const emailVerify = await API.findOne({ email: req.body.email });
    if (!emailVerify) throw new Error("Invalid email");

    const passwordVerify = await bcrypt.compare(
      req.body.password,
      emailVerify.password
    );
    if (!passwordVerify) throw new Error("Invalid password");

    const token = jwt.sign({ id: emailVerify._id }, "surat");
    res.status(200).json({
      status: "Success",
      message: "Successfully",
      loginUser: emailVerify,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
