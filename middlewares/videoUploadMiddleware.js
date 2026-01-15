const multer = require('multer')

const videoStorage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads/videos')
    },
    filename: (req, file, callback) => {
        callback(null, `video-${Date.now()}-${file.originalname}`)
  }
})

const videoFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("video/")) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const videoUploadMiddleware = multer({
    storage:videoStorage,fileFilter:videoFilter
})

module.exports = videoUploadMiddleware