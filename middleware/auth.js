const jwt = require("jsonwebtoken");
const USER = require("../model/user");

exports.authcheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Attach token");

    const tokenverify = jwt.verify(token, "surat");
    if (!tokenverify) throw new Error("Invalid token");

    const userverify = await USER.findById(tokenverify.id);
    if (!userverify) throw new Error("Invalid User");

    next();
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
