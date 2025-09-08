const express = require("express");
const productRouter = express.Router();
const AC = require("../controller/product");
const multer = require("multer");
const AM= require("../middleware/auth")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


productRouter.post("/",AM.authcheck,upload.array("images",10), AC.createData);
productRouter.get("/",AM.authcheck, AC.viewData);
productRouter.delete("/:id",AM.authcheck,AC.deleteData)
productRouter.patch("/:id",AM.authcheck,upload.array("images",10),AC.editData)

module.exports=productRouter