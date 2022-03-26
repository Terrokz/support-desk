const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db')

//connect to databse
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
