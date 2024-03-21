import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const UploadImagesHome = () => {
  const location = useLocation();
  const homeId = location.state.homeId;
  const { user } = useAuthContext();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      console.error("No files selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("home_id", homeId); // Append the homeId to the FormData object
  
    // Append the files to the FormData object with the field name 'images'
    selectedFiles.forEach((file, index) => {
      formData.append(`images`, file); // Use 'images' as the field name
    });
  
    try {
      const response = await fetch(`/home/uploadImages/${homeId}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (response.ok) {
        console.log("Photos uploaded successfully");
      } else {
        console.error("Failed to upload photos");
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };
  
  

  return (
    <div>
      <h1>Upload Images</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImagesHome;
