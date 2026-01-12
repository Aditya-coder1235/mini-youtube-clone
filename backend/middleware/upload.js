const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = "uploads";

        if (file.mimetype.startsWith("image")) {
            uploadPath = "uploads/image";
        } else if (file.mimetype.startsWith("video")) {
            uploadPath = "uploads/video";
        }

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

module.exports = upload;
