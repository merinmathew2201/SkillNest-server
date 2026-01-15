const multer = require('multer')

const pdfStorage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads/notes')
    },
    filename: (req, file, callback) => {
        callback(null, `Resources-${Date.now()}-${file.originalname}`)
  }
})

const pdfFilter = (req, file, callback) => {
  if (file.mimetype == "application/pdf") {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const pdfUploadMiddleware = multer({
    storage:pdfStorage,fileFilter:pdfFilter
})

module.exports = pdfUploadMiddleware