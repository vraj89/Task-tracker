const express= require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use (express.json());

app.use('/api/tasks', require('./routes/taskroute'));  // ← CORRECTED!



app.get('/',(req,res)=>{
    res.send("Welcome to Task Tracker API ");
})

const PORT = process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})