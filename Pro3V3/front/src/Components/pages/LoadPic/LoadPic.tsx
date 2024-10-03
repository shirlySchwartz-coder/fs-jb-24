import { SubmitHandler, useForm } from 'react-hook-form';
import { store } from '../../../redux/store';
import './LoadPic.css';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormControl, FormLabel } from '@mui/joy';

interface ImageFileInput {
  image: File | null;
}

export function LoadPic(): JSX.Element {
  //const [file, setFile] = useState<File | null>(null);
  const location = useLocation();
  const { newVacId } = location.state || {};
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ImageFileInput>();
  const token = store.getState().login.jwt;

  /* const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }; */

  /* const handleUpload = async () => {
    if (!file){
      toast.error('No file selected')
      return;
    } 

    const formData = new FormData();
    formData.append('imageFile', file);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/dashBoard/uploadPicture/${newVacId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`,
          },
        }
      );
      if(response.status===201){
        console.log('Upload success:', response.data,response.data.image_url);
      toast.success('Image added successfully!');
      navigate('/vacations');
      }else{
        console.log(response.status)
      }
      
    } catch (error) {
      toast.error('Image upload filed!');
      console.error('Upload error:', error);
      navigate('/vacations');
    }
  };*/

  const onSubmit: SubmitHandler<ImageFileInput> = async (data) => {
    const formData = new FormData();
    if (data.image) {
      formData.append('imageFile', data.image);
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/dashBoard/uploadPicture/${newVacId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`,
          },
        }
      );

      if (response.status === 201) {
        // אם התגובה היא 201, עבור לדף החופשות
        navigate('/vacations');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className='LoadPic'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl style={{ marginBottom: '20px' }}>
          <FormLabel>Upload Picture for Vacation ID: {newVacId}</FormLabel>
          <input
            type='file'
            {...register('image', {
              required: {
                value: true,
                message: 'Image File  is required',
              },
            })}
            accept='image/png, image/jpeg'
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setValue('image', e.target.files[0]);
              }
            }}
          />
          {errors.image?.message && (
            <p className='edit-error'>This field is required</p>
          )}
        </FormControl>
        <br />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}
