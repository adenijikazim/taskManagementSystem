const express = require('express')
const { createTask, getAllTasks, updateTask, deleteTask } = require('../Controller/taskController')
const { authenticateUser } = require('../middleware/authenticate')
const taskRouter = express.Router()


taskRouter.route('/')
.post(authenticateUser,createTask)
.get(authenticateUser,getAllTasks)

taskRouter.route('/:id')
.patch(authenticateUser,updateTask)
.delete(authenticateUser,deleteTask)

module.exports = taskRouter