const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserProfile = require("../models/userProfileModel");
const homeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  home_id: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  accommodationType: {
    type: String,

    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  utilitiesIncluded: {
    type: Boolean,
    default: false,
  },
  furnished: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  smokingAllowed: {
    type: Boolean,
    default: false,
  },
  moveInDate: {
    type: Date,
    required: true,
  },
  images: [String], // List of image URLs
  houseRules: [String], // List of house rules
  owner_id: {
    type: String,
    required: true,
    unique: true,
  },
  currentMembers: {
    type: [String],
    default: [],
  },
  pendingMembers: {
    type: [String],
    default: [],
  },
});


homeSchema.statics.joinReqHome = async function (userId, homeId) {
  try {
    const home = await this.findOne({ home_id: homeId });
    if (!home) {
      throw new Error("Home not found");
    }
    if (home.pendingMembers.includes(userId)) {
      throw new Error("You already requested to join this home");
    }
    const user = await UserProfile.findOne({ userId : userId });
    if (!user) {
      throw new Error("User not found");
    }
    home.pendingMembers.push(userId);
    await home.save();
    return home;
  } catch (error) {
    throw error;
  }
};



homeSchema.statics.acceptUserRequest = async function (userId, homeId) {
  try {
    const home = await this.findOne({ home_id: homeId });
    if (!home) {
      throw new Error("Home not found");
    }

    // Remove the user from pendingMembers
    home.pendingMembers = home.pendingMembers.filter(member => member !== userId);
    // Update the user's userProfile with the homeId
    const userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) {
      throw new Error("User profile not found");
    }
    userProfile.homeId = homeId;
    await userProfile.save();
    // Add the user to currentMembers
    home.currentMembers.push({userId, name: userProfile.name});

    // Save the updated home
    await home.save();
    return { message: "User request accepted successfully" };
  } catch (error) {
    throw error;
  }
};


homeSchema.statics.rejectUserRequest = async function (userId, homeId) {
  try {
    const home = await this.findOne({ home_id: homeId });
    if (!home) {
      throw new Error("Home not found");
    }

    // Remove the user from pendingMembers
    home.pendingMembers = home.pendingMembers.filter(member => member !== userId);

    // Save the updated home
    await home.save();

    return { message: "User request rejected successfully" };
  } catch (error) {
    throw error;
  }
};





const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
