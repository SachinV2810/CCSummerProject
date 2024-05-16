const express = require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser')

const corsOption={
    origin:"http://localhost:3000",
    credentials:true
}

app.use(cors(corsOption));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(8000,()=>{
    console.log("App is listening to port 8080");
})

