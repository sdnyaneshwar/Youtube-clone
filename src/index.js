// require('dotenv').config({path:'./env'})

import dotenv from 'dotenv'; 

import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
console.log("MongoDB connection failed !!!",err);
})

















/*

const app = express()

( async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR",error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error",error)

    }
})()

*/