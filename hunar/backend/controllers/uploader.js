const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// implement it for multiple files
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

const uploadMultiple = multer({ storage: multerStorage }).array("file", 2);

module.exports = {
  upload,
  uploadMultiple,
};
// Create a muliple file uploader
// Path: controllers/uploader.js
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = "./uploads";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const id = uuidv4();
//     cb(null, `${id}${ext}`);
//   },
// });

// const upload = multer({ storage: storage });
