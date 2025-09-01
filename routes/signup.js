const express = require("express");
const apiRouter = express.Router();
const AC = require("../controller/user");
const multer = require("multer");
const AM = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

apiRouter.post("/", upload.single("profile"), AC.createData);
apiRouter.get("/", AM.authcheck, AC.viewData);
apiRouter.delete("/:id", AM.authcheck, AC.deleteData);
apiRouter.patch("/:id",  AM.authcheck,upload.single("profile"), AC.editData);
apiRouter.post("/login", AC.loginUser);

module.exports = apiRouter;
