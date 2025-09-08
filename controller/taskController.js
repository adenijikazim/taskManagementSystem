const BadRequestError = require("../error.js/bad-request")
const NotFoundError = require("../error.js/not-found")
const {StatusCodes} = require('http-status-codes')
const TaskModel = require('../model/taskModel')

const createTask = async(req,res)=>{
    // req.body.user = req.user.userId
    const {description,completed } = req.body
    const task = await TaskModel.create(req.body)
    res.status(StatusCodes.CREATED).json({task})
}

const getAllTasks =async (req,res)=>{
    const tasks = await TaskModel.find()
    res.status(StatusCodes.OK).json({
        status:'success',
        results:tasks.length,
        message:"Tasks fetched successfully",
        tasks})
    
}

const updateTask =async (req,res)=>{
    const task = await TaskModel.findByIdAndUpdate({_id:req.params.id},req.body,{runValidators:true,new:true})
    if(!task){
        throw new NotFoundError(`No task with id: ${req.params.id}`)
        throw new NotFoundE
    }
    res.status(StatusCodes.OK).json({task})


}

const deleteTask = async(req,res)=>{
const task = await TaskModel.findByIdAndDelete({_id:req.params.id})
if(!task){
    throw new NotFoundError(`No task with the id: ${req.params.id}`)
}

res.status(StatusCodes.OK).json({msg:'task removed'})

}

module.exports = {createTask, getAllTasks, updateTask, deleteTask}