import { select } from "@material-tailwind/react";
import React, { useState } from "react";

export default function ImageCreation({ onImageSelect, onImageURLSelect }) {
  // TO MANAGE STATE OF SELECTED IMAGE
  const [selectedImage, setSelectedImage] = useState(null);


  // SELECT THE FILE & SET URL
  const imageSelectedHandler = (e) => {
    const selectedFile = e.target.files[0];
    // UPDATE STATE W CHOSEN IMAGE
    setSelectedImage(selectedFile);
  //   onImageSelect(selectedFile);
  // };

  const imageURL = URL.createObjectURL(selectedFile)
  onImageSelect(selectedFile)
  // onImageURLSelect(imageURL)
  }
  return (
    <div>
      <input 
       
      type="file" onChange={imageSelectedHandler} />
      {selectedImage && (
        <div className="h-40 w-full flex items-center justify-center">
          
          <img
          // CREATE TEMP URL FOR IMAGE PREVIEW
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="h-full w-auto max-w-full"

          />
           {/* <input
                type="text"
                placeholder="Image URL"
                onChange={imageURLSelectedHandler}
            /> */}
        </div>
      )}
    </div>
  );
}
