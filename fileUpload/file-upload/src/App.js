import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);

  const handleClick = () => {
    if (image) {
      axios.post('http://localhost:8080/image-upload', image, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log('Axios response: ', res);
      })
      .catch(err => {
        console.error('Upload error: ', err);
      });
    } else {
      console.log('No file selected.');
    }
  }

  const getFileInfo = (e) => {
    console.log('File info working!');
    console.log(e.target.files[0]);
    const formData = new FormData(); 
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    setImage(formData);
  }

  return (
    <div className="App">
      <h1>Image Upload Tutorial</h1>
      <button onClick={handleClick}>Upload!</button>
      <input type="file" onChange={getFileInfo}></input>
    </div>
  );
}

export default App;
