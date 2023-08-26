const express = require("express");
const router = express.Router();
const userController = require("../controllers/uploadImageController");
const uploadMiddleware = require('../middleware/uploadMiddleware'); // Correct import

const admin = require('firebase-admin');

router.get('/images/:imageName', async (req, res) => {
    const imageName = req.params.imageName;
    const imageFile = admin.storage().bucket().file(imageName);
        console.log(imageName,imageFile);
    try {
      const stream = imageFile.createReadStream();
      stream.pipe(res);
    } catch (error) {
      res.status(404).send('Image not found');
    }
  });

router.post("/api/upload" , uploadMiddleware, userController.upload);

module.exports = router;