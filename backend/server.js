require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const personalExpenseRoutes = require('./routes/personalExpenses');
const homeExpenseRoutes = require('./routes/homeExpenses');
const personalTaskRoutes = require('./routes/personalTasks');
const homeTaskRoutes = require('./routes/homeTasks');
const userRoutes = require('./routes/user');
const userProfileRoutes = require('./routes/userProfile');
const homeRoutes = require('./routes/home');
const debtorCreditorRoutes = require('./routes/debtorCreditor');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');

// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Serve static files from the 'uploads' directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/personalExpenses', personalExpenseRoutes);
app.use('/api/personalTasks', personalTaskRoutes);
app.use('/api/homeTasks', homeTaskRoutes);
app.use('/profile/', userProfileRoutes);
app.use('/home/', homeRoutes);
app.use('/api/homeExpenses', homeExpenseRoutes);
app.use('/api/debtorCreditor/', debtorCreditorRoutes);
app.use('/admin/', adminRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');
    // listen to port
    const server = app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });

    // Initialize Socket.IO
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: process.env.REACT_APP_BACKENDURL,
        // credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        // console.log("UserData:",userData);
        socket.join(userData.userId);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });
      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        // console.log("chat:", chat)
        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {

          // console.log("user:", user )
          console.log("newMessageRecieved.sender._id", newMessageRecieved.sender._id)
          if (user._id == newMessageRecieved.sender._id) return;

          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData.userId);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
