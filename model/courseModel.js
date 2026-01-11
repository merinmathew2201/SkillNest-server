const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    learnings:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    educatorMail:{
        type:String,
        required:true
    },
    courseApproved: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    }
},{ timestamps: true }
)

const courses = mongoose.model("courses",courseSchema)

module.exports = courses