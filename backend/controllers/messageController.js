const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const UserProfile = require("../models/userProfileModel");


const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    console.log(newMessage);
    try {
      let message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name avatar");
      message = await message.populate("chat");
  
      const userProfilePromises = message.chat.users.map(async (user) => {
        const userProfile = await UserProfile.findOne({ userId: user._id }).select("name avatar");
        return {
          _id: user._id,
          email: user.email,
          name: userProfile ? userProfile.name : 'Unknown',
          avatar: userProfile ? userProfile.avatar : '',
        };
      });
  
      const usersWithProfile = await Promise.all(userProfilePromises);
  
      message.chat.users = usersWithProfile;
  
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name avatar email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
});

module.exports = { sendMessage, allMessages };
