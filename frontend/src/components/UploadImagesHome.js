import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const UploadImagesHome = () => {
  const location = useLocation();
  const homeId = location.state.homeId;
  const { user } = useAuthContext();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const navigate = useNavigate();
  
  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (event) => {
  //   event.preventDefault()
  //   const file = event.dataTransfer.files[0]
  //   if (file) {
  //     setSelectedFiles(URL.createObjectURL(file))
  //   }
  // }


  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setSelectedFiles(prevImages => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file)
      );
    }
    const objectsArray = Array.from(e.target.files);
    console.log(objectsArray);
    setSelectedObjects(objectsArray);
    console.log(selectedObjects);
    
  };

  const handleUpload = async () => {
    if (selectedObjects.length === 0) {
      console.error("No files selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("home_id", homeId); // Append the homeId to the FormData object
  
    // Append the files to the FormData object with the field name 'images'
    selectedObjects.forEach((file, index) => {
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
        navigate(`/`);

      } else {
        console.error("Failed to upload photos");
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };
  
  const renderImages = (source) => {
    return source.map((image) => {
      return <img className="size-96 rounded-lg" src={image} alt="" key={image} />;
    });
  }

  return (
    <>
    <h1 className="text-text text-4xl text-center mb-8">Upload Images</h1>
    <div className="w-1/2 mx-auto text-text flex flex-col">

        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-secondary/80 border-gray-600 hover:border-gray-700 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="material-symbols-outlined text-6xl mb-4 text-gray-500 dark:text-gray-400">upload</span>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload image</span>
                </p>
            </div>
            <input id="dropzone-file" multiple type="file" className="hidden" onChange={handleFileChange}/>
        </label>
        <button onClick={handleUpload} className="mt-8 px-4 py-4 text-lg bg-secondary rounded-md">Upload</button>
    </div>
    <div className="grid grid-cols-5 p-4 gap-4 mt-4">
      {renderImages(selectedFiles)}
    </div>

    </>
  );
};

export default UploadImagesHome;
