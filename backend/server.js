require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const personalExpenseRoutes = require('./routes/personalExpenses')
const userRoutes = require('./routes/user')
const userProfileRoutes = require('./routes/userProfile')
const cors = require('cors')
// express app
const app = express()
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/personalExpenses', personalExpenseRoutes)
app.use('/api/user', userRoutes)
app.use('/profile/', userProfileRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 