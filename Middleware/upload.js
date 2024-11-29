const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(null, './image'); // Upload folder
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Create folder if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // File name format
    },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, and GIF files are allowed'), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Max file size: 5MB
    fileFilter: fileFilter,
});

module.exports = upload;
