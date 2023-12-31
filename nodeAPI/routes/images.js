const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Set up storage options for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../uploads"); // Specify the folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);

        cb(null, uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });


/* POST upload - uploads one or more images */
router.post('/upload', upload.array('file', 10), (req, res) => {
    try {
        const filePaths = req.files.map(file => file.filename);
        res.json(filePaths);
    } catch (err) {
        console.error(`Error uploading images `, err);
        next(err);
    }
});

module.exports = router;