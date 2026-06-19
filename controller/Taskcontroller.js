const express= require('express');
const Task = require('../models/Task');  // ← Match the actual filename "Taks.js"!



exports.createTask = async(req,res)=>{
    try{
        const {title,description,status,createdAt}=req.body;
        const task = await Task.create({title,description,status,createdAt});
        res.status(201).json({success:true,task});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

exports.getAllTasks = async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json({success:true,tasks});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

exports.updateTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        );
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        res.status(200).json({success:true,task});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

exports.getTaskById = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        res.status(200).json({success:true,task});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

exports.deleteTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        res.status(200).json({success:true,message:"Task deleted successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}