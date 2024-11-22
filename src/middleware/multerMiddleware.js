import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "uploads/");
  },

  filename: (req, file, done) => {
    const ext = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, ext) + Date.now() + ext;

    done(null, fileName);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

const upload = multer({ storage: storage });

module.exports = upload;
