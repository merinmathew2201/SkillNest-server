const lectures = require('../model/lectureModel')
const sections = require('../model/sectionModel')

// create lecture
exports.addLectureController = async(req,res)=>{
    console.log("Inside addLectureController")
    try {
        const { courseId, sectionId, title, isPreview } = req.body
        const videoURL = req.file.filename
        const section = await sections.findById(sectionId)
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }
        else{
            const lectureCount = await lectures.countDocuments({ sectionId })
            const newLecture = await lectures.create({
                courseId,sectionId,title,videoURL,isPreview:isPreview || false,order:lectureCount
            })
            res.status(201).json(newLecture)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
}

// get all lectures by section
exports.getLecturesBySectionController = async (req, res) => {
  console.log("Inside getLecturesBySectionController")

  const { sectionId } = req.params

  try {
    const allLectures = await lectures.find({ sectionId }).sort({ order: 1 })
    res.status(200).json(allLectures)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// delete lecture
exports.removeLectureController = async (req, res) => {
  console.log("Inside removeLectureController")
  const { lectureId } = req.params
  try {
    const removeLecture = await lectures.findByIdAndDelete(lectureId)
    res.status(200).json(removeLecture)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// get preview lecture
exports.getPreviewLecturesController = async (req, res) => {
  console.log("Inside getPreviewLecturesController")

  const { courseId } = req.params

  try {
    const previewLectures = await lectures.find({courseId,isPreview: true})

    res.status(200).json(previewLectures)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
