import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp/')
  },
  filename: function (req, file, cb) {
    const ramdomName =
      Date.now() + '-' + Math.round(Math.random() * 1e6)
    cb(null, file.fieldname + '-' + ramdomName + '-' + file.originalname)
  },
})

export const upload = multer({ storage })