const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const UserProfile = require("../models/userProfileModel");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    // Fetch user profile for both users
    const userProfilePromises = isChat[0].users.map(async (user) => {
      const userProfile = await UserProfile.findOne({ userId: user._id }).select("name avatar");
      return {
        _id: user._id,
        email: user.email,
        name: userProfile ? userProfile.name : 'Unknown',
        avatar: userProfile ? userProfile.avatar : '',
      };
    });
  
    const usersWithProfile = await Promise.all(userProfilePromises);
  
    // Update chat object with users' profiles
    const updatedChat = {
      ...isChat[0].toObject(),
      users: usersWithProfile,
    };
  
    res.status(200).json(updatedChat);
  });
  //@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        const chatsWithProfile = await Promise.all(
            chats.map(async (chat) => {
                const usersWithProfile = await Promise.all(
                    chat.users.map(async (user) => {
                        const userProfile = await UserProfile.findOne({ userId: user._id }).select("name avatar");
                        return {
                            _id: user._id,
                            email: user.email,
                            name: userProfile ? userProfile.name : 'Unknown', // Handle null userProfile
                            avatar: userProfile ? userProfile.avatar : '',
                        };
                    })
                );

                return {
                    ...chat.toObject(),
                    users: usersWithProfile,
                };
            })
        );

        res.status(200).send(chatsWithProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
  
//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the fields" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }

    // Fetch users excluding the password field
    const populatedUsers = await User.find({ _id: { $in: users } }).select('-password');

    // Filter out the password field from the result
    const filteredUsers = populatedUsers.map(user => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    });

    // Add the current user to the list of users
    filteredUsers.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: filteredUsers,
            isGroupChat: true,
            groupAdmin: req.user,
        });
        console.log(groupChat);
        // Populate name, avatar for users
        const userProfilePromises = groupChat.users.map(async (user) => {
            const userProfile = await UserProfile.findOne({ userId: user._id }).select("name avatar");
            const userEmail = await User.findOne({ _id: user._id }).select("email");
            return {
                _id: user._id,
                email: userEmail.email,
                name: userProfile ? userProfile.name : 'Unknown',
                avatar: userProfile ? userProfile.avatar : '',
            };
        });

        // Populate name, avatar for groupAdmin
        const groupAdminProfile = await UserProfile.findOne({ userId: req.user._id }).select("name avatar");
        const groupAdminEmail = await User.findOne({ _id: req.user._id }).select("email");
        // Update groupAdmin with name, avatar
        const fullGroupChat = {
            ...groupChat.toObject(),
            users: await Promise.all(userProfilePromises),
            groupAdmin: {
                _id: req.user._id,
                email: groupAdminEmail.email,
                name: groupAdminProfile ? groupAdminProfile.name : 'Unknown',
                avatar: groupAdminProfile ? groupAdminProfile.avatar : '',
            }
        };

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

          
// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      const updatedChatWithProfile = await populateUsersWithProfile(updatedChat);
      res.json(updatedChatWithProfile);
    }
  });
  
  const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      const removedWithProfile = await populateUsersWithProfile(removed);
      res.json(removedWithProfile);
    }
  });
  
  const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      const addedWithProfile = await populateUsersWithProfile(added);
      res.json(addedWithProfile);
    }
  });
  
  // Function to populate users' names and avatars
  const populateUsersWithProfile = async (chat) => {
    const userProfilePromises = chat.users.map(async (user) => {
      const userProfile = await UserProfile.findOne({ userId: user._id }).select("name avatar");
      const userEmail = await User.findOne({ _id: user._id }).select("email");
      return {
        _id: user._id,
        email: userEmail.email,
        name: userProfile ? userProfile.name : 'Unknown',
        avatar: userProfile ? userProfile.avatar : '',
      };
    });
  
    const usersWithProfile = await Promise.all(userProfilePromises);
  
    return {
      ...chat.toObject(),
      users: usersWithProfile,
    };
  };
  

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};