require('dotenv').config()
const express = require('express')
const app = express()
require('async-error-handler')
const cookieParser = require('cookie-parser')

const morgan = require('morgan')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const connectDB = require("./db")
const taskRouter = require("./Routes/taskRoutes")

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1/tasks/auth', authRouter)
app.use('/api/v1/tasks/users', userRouter)
app.use('/api/v1/tasks', taskRouter)

connectDB()
app.listen(2024, console.log('server is listening on port 2024'))