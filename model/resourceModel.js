const mongoose = require('mongoose')

const resourseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fileURL: {
        type: String,
        required: true
    }
},{timestamps:true})

const resources = mongoose.model("resources",resourseSchema)

module.exports = resources