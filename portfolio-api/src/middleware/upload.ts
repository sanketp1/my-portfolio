import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for images/videos/gifs
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/') ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image, GIF, and video files are allowed!'));
    }
  },
});

// Document upload middleware for resumes, PDFs, etc.
export const documentUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for documents
  fileFilter: (req, file, cb) => {
    // Allow PDF, DOC, DOCX files
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF, DOC, and DOCX files are allowed!'));
    }
    cb(null, true);
  },
}); 