const express = require('express')
//const fs = require("fs")
const cafeRouter = require("./routers/cafe_route")

//const { Module } = require('module')

const app = new express();

app.use(express.json());

//middleware 

app.use((req,res,next)=>{
    console.log('i am coming from middleware')
    next()
});

app.use('/cafe', cafeRouter)
//app.use("/cafe/:id", cafeRouter)
//app.use("/cafe/add", cafeRouter)
//app.use("/cafe/:id", cafeRouter)
//app.use("/cafe/:id", cafeRouter)

module.exports = app

