const express = require('express');
const router = express.Router();

const upload_image = require('../middlewares/multer-S3.js');

const ImageController = require('../controllers/image.controller');
const imageController = new ImageController();

router.post('/upload_image', upload_image.single('img_url'), imageController.upload_image);

module.exports = router;
