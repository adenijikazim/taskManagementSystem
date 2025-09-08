const express = require('express')
const { createTask, getAllTasks, updateTask, deleteTask } = require('../Controller/taskController')
const { authenticateUser } = require('../middleware/authenticate')
const taskRouter = express.Router()


taskRouter.route('/')
.post(authenticateUser,createTask)
.get(getAllTasks)

taskRouter.route('/:id')
.patch(updateTask)
.delete(deleteTask)

module.exports = taskRouter