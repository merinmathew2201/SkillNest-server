const courses = require('../model/courseModel')

// create course
exports.createCourseController = async (req,res)=>{
    console.log("Inside createCourseController");
    const {title,shortDescription,overview,learnings,category,level,duration,price} = req.body
    const thumbnail = req.file.filename
    const educatorMail = req.payload

    try {
        const existingCourse = await courses.findOne({title,educatorMail})
        if(existingCourse){
            res.status(409).json("Course already exists!!! Request Failed...")
        }else{
            const newCourse = await courses.create({title,shortDescription,overview,learnings,category,level,duration,thumbnail,price,educatorMail})
            res.status(201).json(newCourse)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// get all courses - admin
exports.getAllCoursesController = async (req,res)=>{
    console.log("Inside getAllCoursesController");
    try{
        const allCourses = await courses.find()
        res.status(200).json(allCourses)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// get all pending courses -admin
exports.getPendingCoursesController = async (req,res)=>{
    console.log("Inside getPendingCoursesController");
    try{
        const pendingCourses = await courses.find({courseApproved:false})
        res.status(200).json(pendingCourses)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// approve educator status
exports.approveCourseController = async (req,res)=>{
    console.log("Inside approveEducatorController");
    // get id of educator from url
    const {id} = req.params
    try{
        const updateCourseStatus = await courses.findByIdAndUpdate(id,{courseApproved:true},{new:true})
        res.status(200).json(updateCourseStatus)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// delete course
exports.removeCourseController = async (req,res)=>{
    console.log("Inside removeCourseController");
    // get id  from url
    const {id} = req.params
    try{
        const removeCourse = await courses.findByIdAndDelete({_id:id})
        res.status(200).json(removeCourse)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// get all educator created course
exports.getEducatorCoursesController = async(req,res)=>{
    console.log("Inside getEducatorCoursesController ");
    try {
        const educatorMail = req.payload
        const educatorCourses = await courses.find({educatorMail})
        res.status(200).json(educatorCourses)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
    
}

// get all courses
exports.getSingleCourseController = async (req,res)=>{
    console.log("Inside getSingleCourseController");
    const {courseId} = req.params
    try{
        const singleCourse = await courses.findById(courseId)
        res.status(200).json(singleCourse)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// publish course
exports.publishCourseController = async (req, res) => {
  const { courseId } = req.params

  try {
    const updatedCourse = await courses.findByIdAndUpdate(courseId,{ isPublished: true },{ new: true })

    res.status(200).json(updatedCourse)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// get latest courses in home page
exports.getLatestCoursesController = async (req, res) => {
  try {
    const latestCourses = await courses.find({ isPublished: true }).sort({ createdAt: -1 }) .limit(6)

    res.status(200).json(latestCourses)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// get all published courses (with search)
exports.getAllPublishedCoursesController = async (req, res) => {
  console.log("Inside getAllPublishedCoursesController")

  const searchKey = req.query.search 

  try {
    const allCourses = await courses.find({isPublished: true,title: { $regex: searchKey, $options: "i" }}).sort({ createdAt: -1 })
    res.status(200).json(allCourses)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// student - view course
exports.getSinglePublishedCourseController = async (req, res) => {
  const { courseId } = req.params
  try {
    const course = await courses.findOne({_id: courseId,isPublished: true})
    if (course) {
        res.status(200).json(course)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}


