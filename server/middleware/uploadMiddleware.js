const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('../v-chamber-firebase-adminsdk-yxd9b-3448f1bca9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://v-chamber.appspot.com'
});

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage(); // Store file in memory before uploading to Firebase

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  }
});

module.exports = (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Multer error: ' + err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Error processing file: ' + err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const file = req.file;
    const filename = Date.now() + '-' + file.originalname;
    const fileUpload = bucket.file(filename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      return res.status(500).json({ error: 'Error uploading file.' });
    });

    blobStream.on('finish', () => {
      const imagePath = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      const imageName = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      // const storageBucketURL = 'https://firebasestorage.googleapis.com/v0/b/v-chamber.appspot.com/o';
      const storageBucketURL = process.env.REACT_APP_IMAGES_URL ;
       const imageUrl = `${encodeURIComponent(fileUpload.name)}?alt=media`;
      req.imagePath = imagePath; // Add image path to the request object
      req.imageName = fileUpload.name; // Add image path to the request object
      req.imageUrl = imageUrl; // Add image path to the request object
      req.file.path = imageUrl; // Add image path to the request object
      next(); // Move to the next middleware/route
    });

    blobStream.end(file.buffer);
  });
};
