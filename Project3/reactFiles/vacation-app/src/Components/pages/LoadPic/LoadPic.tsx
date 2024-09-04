import { useForm } from 'react-hook-form';
import { store } from '../../../redux/store';
import vars from '../../utils/Variants';
import './LoadPic.css';
import axios from 'axios';
import { useState } from 'react';

export function LoadPic(): JSX.Element {
  const [fileToUpload, setFileToUpload] = useState<any>()
  const token = store.getState().login.jwt;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleUploadFile (file:any)  {
    console.log(file);
    if (!file) return;
    const token = store.getState().login.jwt;
    //console.log('token:',token)
    const formData = new FormData();
    console.log(formData, file);
    formData.append('file', file);
    const res = await axios
      .post('http://localhost:8080/api/v1/dashBoard/uploadPicture', formData, {
        headers: {
          'Authorization': `${token}`
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            'Upload progress: ' +
              Math.round(
                (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
              ) +
              '%'
          );
        },
      })
      .then((res) => {
        console.log('Axios response: ', res);
      })
      .catch((err) => {
        console.error('Upload error: ', err);
      });
    console.log(res);
  };

  return (
    <div className='LoadPic'>
      <h2>Load Pic</h2>
      <div className='LoadPic'>
        <form
          id='uploadForm'
          onSubmit={(e) =>
            handleUploadFile(fileToUpload)
          }
          encType='multipart/form-data'
        >
          <input type='file' name='sampleFile' accept='image/*' onChange={(e) =>
            setFileToUpload((e.target ).files?.[0])
          } />
          <input type='submit' value='Upload!' />
        </form>
      </div>
    </div>
  );
}
