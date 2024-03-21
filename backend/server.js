require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const personalExpenseRoutes = require('./routes/personalExpenses')
const personalTaskRoutes = require('./routes/personalTasks')
const userRoutes = require('./routes/user')
const userProfileRoutes = require('./routes/userProfile')
const homeRoutes = require('./routes/home')
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

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// routes
app.use('/api/personalExpenses', personalExpenseRoutes)
app.use('/api/personalTasks', personalTaskRoutes)
app.use('/api/user', userRoutes)
app.use('/profile/', userProfileRoutes)
app.use('/home/', homeRoutes)



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