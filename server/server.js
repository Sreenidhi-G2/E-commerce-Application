const express = require("express");
const mongoose= require("mongoose")
const app=express();
const cookieParser=require("cookie-parser")
const fileUpload = require('express-fileupload')
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/' 
}))
const PORT = process.env.PORT|| 5000;
app.use("user",require("./routes/routes"))
app.use("api",require("./routes/categoryRoutes"))
app.use("api",require("./routes/productsRoutes"))
app.use("api",require("./routes/upload"))


app.get("/",(req,res)=>{
    res.json({message:"hi"})
})
app.listen(PORT,()=>{
    console.log("Server Created");
    
})      
const URI=process.env.MONGODB_URL;
mongoose.connect(URI,{ 
}).then(()=>{
    console.log("Connected! ");
    
}).catch(err=>{
    console.log(err);
    
})


