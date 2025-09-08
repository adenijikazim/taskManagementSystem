
const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        // await mongoose.connect(process.env.MONGO_URI)
        await mongoose.connect('mongodb+srv://Qasim:12345@tours.0uu0pza.mongodb.net/?retryWrites=true&w=majority&appName=tours')
        console.log('MongoDB connected')
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB