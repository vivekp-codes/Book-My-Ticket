const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

/* Cloudinary configuration */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* Cloudinary storage setup */
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "book-my-ticket",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

/* Upload Route */
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    const imageUrl = req.file.path; // Cloudinary URL

    res.status(200).json({
      message: "Image Uploaded",
      url: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

module.exports = router;