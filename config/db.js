const mongoose = require('mongoose')

const connectionURL = process.env.databaseURL

mongoose.connect(connectionURL).then(res=>{
    console.log("MongoDB Connected Successfully...");
}).catch(err=>{
    console.log("MongoDB connection Failed!!!");
    console.log(err);
})