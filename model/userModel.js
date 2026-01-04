const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    approvalStatus:{
        type:Boolean,
        required:true
    },
    bio:{
        type:String,
        default:""
    },
    picture:{
        type:String,
        default:""
    },
})

const users = mongoose.model("users",userSchema)

module.exports = users