import multer from 'multer';
import path from 'path';

// Configure storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/productImages"); // Ensure this directory exists, or Multer will throw an error
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

// File filter for image types
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, , PNG and webP files are allowed'), false);
    }
};

// Set up Multer middleware
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Max file size: 5 MB
    fileFilter,
});
  
export { upload };