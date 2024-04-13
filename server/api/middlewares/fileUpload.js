const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `client/public/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `gsas-${req.documentName}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const validdFileType = file.mimetype.includes('image/');
  validdFileType ? cb(null, true) : cb(null, false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
