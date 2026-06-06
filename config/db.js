const mongoose = require('mongoose');

require('dotenv').config();
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.Mongodb_URI )
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = connectDB;