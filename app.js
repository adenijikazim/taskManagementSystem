require("dotenv").config()
const express = require('express')
const app = express()
require('async-error-handler')
const cookieParser = require('cookie-parser')

const mongoose= require('mongoose')
const morgan = require('morgan')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const connectDB = require("./db")
const taskRouter = require("./Routes/taskRoutes")

app.use(express.json())
app.use(morgan('dev'))
// app.use(cookieParser(process.env.JWT_SECRET))
app.use(cookieParser())

app.use('/api/v1/tasks/auth', authRouter)
app.use('/api/v1/tasks/users', userRouter)
app.use('/api/v1/tasks', taskRouter)

// mongoose
// .connect(`mongodb+srv://Qasim:12345@tours.0uu0pza.mongodb.net/AUTH?retryWrites=true&w=majority`)
// .then(console.log('db is connected'))
// // .catch(console.log('db failed to connect'))
connectDB()
app.listen(2024, console.log('server is listening on port 2024'))