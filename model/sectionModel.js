const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    order:{
        type:Number,
        default:0
    }
},{timestamps:true})

const sections = mongoose.model("sections",sectionSchema)

module.exports = sections