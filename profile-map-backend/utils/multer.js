import multer from 'multer';

// Storage configuration for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Set up Multer
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        console.log('Uploaded file type:', file.mimetype);
        
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPEG or PNG files are allowed'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5 MB
    }
});

export default upload;
