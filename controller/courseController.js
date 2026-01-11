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

// get all courses
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

// get all pending courses 
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