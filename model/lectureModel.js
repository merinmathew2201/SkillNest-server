const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses",
        required:true
    },
    sectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sections",
        required:true
    },
    title: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    isPreview: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
},{ timestamps: true })

const lectures = mongoose.model("lectures",lectureSchema)

module.exports = lectures