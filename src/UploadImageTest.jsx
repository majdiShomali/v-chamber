import React, { useState } from 'react';
import axios from 'axios';


function ImageDisplay({ imageName }) {
  const imageUrl = getImageUrl(imageName);

  return (
    <div>
      <img src={imageUrl} alt={imageName} />
    </div>
  );
}
function getImageUrl(imageName) {
  const storageBucketURL = 'https://firebasestorage.googleapis.com/v0/b/v-chamber.appspot.com/o';
  const imageUrl = `${storageBucketURL}/${encodeURIComponent(imageName)}?alt=media`;
  console.log(imageUrl);
  return imageUrl;
}



const UploadImageTest = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        setImageUrl(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };





    const imageName = '1692905152653-nasty.png'; // Replace with your image name



  return (
    <div>
    <h1>Image Upload</h1>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload</button>
    {imageUrl && (
      <div>
        <h2>Uploaded Image:</h2>
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
      </div>
    )}

 
    <div>
      <h1>Image Display</h1>
      <ImageDisplay imageName={imageName} />
    </div>
    
     </div>
  )
}

export default UploadImageTest