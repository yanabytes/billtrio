import React, { useState } from 'react';

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageName, setImageName] = useState('');

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image && image.size < 2000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        setImageName(image.name);
      };
      reader.readAsDataURL(image);
      setSelectedImage(image);
    } else {
      alert('Image size must be less than 2MB');
    }
  };

  const handleFileInputClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async () => {
    if (previewUrl && selectedImage) {
      try {
        const formData = new FormData();
        formData.append('receipt', selectedImage);
        console.log(selectedImage);

        const response = await fetch('http://localhost:3001/upload-receipt', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Image upload failed');
        }

        const data = await response.json();
        console.log('Success:', data);
        // Redirect to a new page to display extracted data
        window.location.href = '/receipt-details'; // Assuming route for receipt details page

      } catch (error) {
        console.error('Error:', error);
        alert('Image upload failed!');
      }
    } else {
      alert('No image selected!');
    }
  };

  return (
    <div className="container">
      <input type="file" id="fileInput" accept="image/*" hidden onChange={handleImageChange} />
      <div className="img-area" data-img={imageName}>
        {!previewUrl && (
          <>
            <i className="bx bxs-cloud-upload icon"></i>
            <h3>Upload Image</h3>
            <p>Image size must be less than <span>2MB</span></p>
          </>
        )}
        {previewUrl && <img id="previewImage" src={previewUrl} alt="Preview" />}
      </div>
      <button className="select-image" onClick={handleFileInputClick}>Select Image</button>
      <button className="submit-picture" onClick={handleSubmit}>Submit Picture</button>
    </div>
  );
}

export default Home;
