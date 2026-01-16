// import express,cors,dotenv
require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/db')
const router = require('./routing/router')
const path = require('path')

// create express server using express
const skillnestServer = express()

// enable cors
skillnestServer.use(cors())

// use json parser 
skillnestServer.use(express.json())

// use router in server app
skillnestServer.use(router)


skillnestServer.use('/uploads',express.static('./uploads'))

// skillnestServer.use(
//   '/uploads/images',
//   express.static(path.join(__dirname, 'uploads/images'))
// )

// skillnestServer.use(
//   '/uploads/videos',
//   express.static(path.join(__dirname, 'uploads/videos'))
// )

//create a port
const PORT = 3000

// server start listen port for client request
skillnestServer.listen(PORT,()=>{
    console.log("SkillNest Server Started.... And waiting for client Request!!!");
})

// resolve get request
skillnestServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>SkillNest Server Started.... And waiting for client Request!!!</h1>`)
})