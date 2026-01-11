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