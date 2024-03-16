import React from "react";

const ProfilePicture = ({ imageUrl }) => {
    // console.log("imageUrl", imageUrl);
  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" style={{ maxWidth: "200px" }} />
      ) : (
        <p>No profile picture available</p>
      )}
    </div>
  );
};

export default ProfilePicture;
