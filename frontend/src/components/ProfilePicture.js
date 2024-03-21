import React from "react";

const ProfilePicture = ({ imageUrl }) => {
    // console.log("imageUrl", imageUrl);
  return (
    
    <div className="block text-zinc-100 text-xl ml-0">
      {imageUrl ? (
        <img className="rounded-lg" src={imageUrl} alt="Profile"/>
      ) : (
        <p>No profile picture available</p>
      )}
    </div>
  );
};

export default ProfilePicture;
