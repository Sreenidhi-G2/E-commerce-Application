const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

// Cloudinary Configuration


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Upload Route
router.post('/upload', auth, authAdmin, async (req, res) => {
    try {
        console.log('Request files:', req.files);
        // Check if a file is uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No file uploaded in the request');
            return res.status(400).json({ msg: "No file was uploaded" });
        }

        console.log('File received:', req.files);

        const file = req.files.file;

        // Validate file size (max: 1MB)
        if (file.size > 1024 * 1024) {
            console.log('File size is too large:', file.size);
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "Size too large" });
        }

        // Validate file type (only jpeg and png allowed)
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            console.log('Invalid file format:', file.mimetype);
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "File format is incorrect" });
        }

        // Upload to Cloudinary
        console.log('Uploading to Cloudinary...');
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'test' }, (err, result) => {
            if (err) {
                console.error('Cloudinary upload error:', err);
                throw err;
            }

            // Remove temporary file
            removeTmp(file.tempFilePath);

            console.log('File uploaded to Cloudinary:', result);
            res.json({
                public_id: result.public_id,
                url: result.secure_url,
            });
        });
    } catch (err) {
        console.error('Error during file upload:', err);
        res.status(500).json({ msg: err.message });
    }
});

// Destroy/Delete Route
router.post('/destroy', auth, authAdmin, async (req, res) => {
    try {
        const { public_id } = req.body;

        // Validate public_id
        if (!public_id) {
            console.log('No public_id provided in the request');
            return res.status(400).json({ msg: "No images selected" });
        }

        console.log('Deleting file from Cloudinary:', public_id);

        // Delete file from Cloudinary
        cloudinary.v2.uploader.destroy(public_id, (err, result) => {
            if (err) {
                console.error('Cloudinary delete error:', err);
                throw err;
            }

            console.log('File deleted from Cloudinary:', result);
            res.json({ msg: "Deleted" });
        });
    } catch (err) {
        console.error('Error during file deletion:', err);
        res.status(500).json({ msg: err.message });
    }
});

// Function to remove temporary files
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.error('Error removing temporary file:', err);
            throw err;
        }
        console.log('Temporary file removed:', path);
    });
};

module.exports = router;
