const express = require('express');
const uniqid = require('uniqid');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Image/');
  },
  filename: (req, file, cb) => {
    cb(null, uniqid() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {

  const imageUrl = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;

  res.status(200).json({
    message: 'Image Uploaded',
    url: imageUrl,
  });

});

module.exports = router;