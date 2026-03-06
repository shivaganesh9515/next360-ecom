import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req: any, file: any, cb: any) => {
  const allowed = [
    'image/jpeg', 'image/png',
    'image/webp', 'application/pdf'
  ]
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('File type not allowed'))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})

export const uploadProductImages = upload.array('images', 6)
export const uploadSingle = upload.single('file')
export const uploadDocs = upload.array('documents', 3)
