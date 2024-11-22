import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploadImgs/");
  },

  filename: (req, file, done) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext) + Date.now() + ext;

    done(null, fileName);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadImg = multer({ storage: storage });

module.exports = uploadImg;
