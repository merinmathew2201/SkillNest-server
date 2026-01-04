// import express,cors,dotenv
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// create express server using express
const skillnestServer = express()

// enable cors
skillnestServer.use(cors())

// use json parser 
skillnestServer.use(express.json())

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