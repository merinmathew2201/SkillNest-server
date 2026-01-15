const resources = require('../model/resourceModel')
const courses = require('../model/courseModel')

// add resourses
exports.addResourceController = async(req,res)=>{
    console.log("Inside addResourceController")
    try {
        const { courseId, title } = req.body
      
        const fileURL =  req.file.filename
        const newResource = await resources.create({courseId,title,fileURL})
        res.status(201).json(newResource)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

// get all resourses of the course
exports.getResourcesByCourseController = async (req, res) => {
  console.log("Inside getResourcesByCourseController")

  const { courseId } = req.params

  try {
    const allResources = await resources.find({ courseId })
    res.status(200).json(allResources)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// delete resources
exports.removeResourceController = async (req, res) => {
  console.log("Inside deleteResourceController")

  const { resourceId } = req.params

  try {
    const removeResource = await resources.findByIdAndDelete(resourceId)
    res.status(200).json(removeResource)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}