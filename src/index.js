const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') 
require('dotenv').config()

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const conectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.BD_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rjsv0uv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
conectDB()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5020
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))