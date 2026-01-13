const courses = require('../model/courseModel')
const sections = require('../model/sectionModel')

// add section
exports.addSectionController = async(req,res)=>{
    console.log("Inside addSectionController");
    
    const { courseId, title } = req.body
    try {
        const course = await courses.findById(courseId)
        if(course){
            if(course.courseApproved){
                const newSection = await sections.create({courseId, title}) 
                res.status(201).json(newSection)
            }
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

// get all sections
exports.getSectionsController = async(req,res)=>{
    console.log("Inside getSectionsController");

    const {courseId} = req.params
    try {
        const allSections = await sections.find({courseId}).sort({order:1})
        res.status(200).json(allSections)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete section
exports.removeSectionController = async(req,res)=>{
    console.log("Inside removeSectionController");

    const {sectionId} = req.params
    try {
        const removeSection = await sections.findByIdAndDelete(sectionId)
        res.status(200).json(removeSection)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}