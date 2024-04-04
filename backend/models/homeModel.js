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
  currentMembers: [{
    userId: String,
    name: String
  }],
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
    const user = await UserProfile.findOne({ userId: userId });
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
    home.pendingMembers = home.pendingMembers.filter(
      (member) => member !== userId
    );

    const userProfile = await UserProfile.findOne({ userId });
    // Add the user to currentMembers
    // console.log("userProfile", userProfile);
    home.currentMembers.push({userId: userProfile.userId, name: userProfile.name});

    // Save the updated home
    await home.save();

    // Update the user's userProfile with the homeId
    if (!userProfile) {
      throw new Error("User profile not found");
    }
    userProfile.homeId = homeId;
    await userProfile.save();

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
    home.pendingMembers = home.pendingMembers.filter(
      (member) => member !== userId
    );

    // Save the updated home
    await home.save();

    return { message: "User request rejected successfully" };
  } catch (error) {
    throw error;
  }
};

// homeSchema.statics.homeMateRetrival = async function (homeId) {

//   Home.findOne({ home_id: homeId })
//     .then((home) => {
//       if (!home) {
//         throw new Error("Home not found");
//       }
//       const currentMembersIds = home.currentMembers;

//       return UserProfile.find({ userId: { $in: currentMembersIds } });
//     })
//     .then((userProfiles) => {
//       // Extract names from user profiles
//       const currentMembersNames = userProfiles.map((profile) => profile.name);
//       console.log("Current members of the home:", currentMembersNames);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
