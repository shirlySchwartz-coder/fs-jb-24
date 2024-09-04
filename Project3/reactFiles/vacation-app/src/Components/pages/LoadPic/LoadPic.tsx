import { useForm } from 'react-hook-form';
import { store } from '../../../redux/store';
import './LoadPic.css';
import axios from 'axios';
import { useState } from 'react';

export function LoadPic(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const token = store.getState().login.jwt;
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('sampleFile', file); // Ensure the name matches the backend

    try {
      const response = await axios.post('/api/v1/dashBoard/uploadPicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`, // Adjust the token as needed
        },
      });
      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className='LoadPic'>
      <h2>Load Pic</h2>
      <div className='LoadPic'>
        <input type='file' onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}
