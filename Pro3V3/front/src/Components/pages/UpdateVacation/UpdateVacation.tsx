import './UpdateVacation.css';
import CssBaseline from '@mui/joy/CssBaseline';
import Sheet from '@mui/joy/Sheet';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';

import vars from '../../utils/Variants';
import { useNavigate, useParams } from 'react-router-dom';
import { error } from 'console';
import { store } from '../../../redux/store';
import { CheckJWT } from '../../utils/JWT';

const SheetValues = {
  sx: {
    width: 500,
    mx: 'auto',
    my: 2,
    py: 3,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: 'sm',
    boxShadow: 'md',
    alignItems: 'center',
  },
};

interface VacationInput {
  vacationId: number;
  destination: string;
  vacInfo: string;
  startDate: string;
  endDate: string;
  price: number;
  image: File | null;
  oldImage: string;
}

export function UpdateVacation(): JSX.Element {
  const { id } = useParams();
  let token = store.getState().login.jwt;
  const navigate = useNavigate();
  //const [image, setImage]= useState<File | null>()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting, touchedFields, submitCount },
    setValue,
    watch,
    getValues,
  } = useForm<VacationInput>({
    reValidateMode: 'onChange',
    defaultValues: 
    async () => {
      const response = await axios.get(
        `http://localhost:8080/api/v1/dashBoard/edit/` + id,
        {
          headers: { 'Authorization': `${token}` },
        }
      );
      const dataToUpdate = await response.data;
      console.log(dataToUpdate);
      return {
        vacationId: dataToUpdate[0].vacationId,
        destination: dataToUpdate[0].destination,
        vacInfo: dataToUpdate[0].vacInfo,
        startDate: new Date(dataToUpdate[0].startDate)
          .toISOString()
          .split('T')[0],
        endDate: new Date(dataToUpdate[0].endDate).toISOString().split('T')[0],
        price: dataToUpdate[0].price,
        image: null,
        oldImage: dataToUpdate[0].pictureUrl,
      };
    },
  });
  console.log(isDirty)
  console.log(errors)
  const fileInputValue = watch('oldImage');
  //const imageFile = watch('image'); // Watch to get the current value of the image file input
  

  const onSubmit: SubmitHandler<VacationInput> = async (data) => {
    console.log(data);
    console.log('isValid',isValid)
    console.log('isSubmitting',isSubmitting)
    if (!CheckJWT()) {
      navigate('/login');
      return;
    }
    let formData = new FormData();
    formData.append('vacationId', String(data.vacationId));
    formData.append('destination', data.destination);
    formData.append('vacInfo', data.vacInfo);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('price', String(data.price));
    if (data.image) {
      formData.append('image', data.image);
    }
    console.log('Form Data:', formData);
    // API call to update vacation
   
    //let token = store.getState().login.jwt;
    try {
      const response = await axios.put(vars.UPDATE_VAC_URL + id, formData, {
        headers: { 'Authorization': `${token}` ,'Content-Type': 'multipart/form-data',},
      });
      console.log(response);
    } catch (error) {
      throw new Error('Update did not succeed');
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue(name as keyof VacationInput, value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('image', e.target.files[0]);
    }
  };

  return (
    <div className='UpdateVacation'>
      <h2>Update Vacation</h2>
      <CssBaseline />
      <Sheet variant='outlined' sx={SheetValues.sx}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor='destination'>Destination</FormLabel>
            <input
              {...register('destination', { required: true })}
              placeholder='Destination'
              onBlur={handleInputChange}
            />
            {errors.destination && <span>This field is required</span>}
            <FormLabel htmlFor='vacInfo'>Vacation Info</FormLabel>
            <TextField
              multiline
              rows={6}
              {...register('vacInfo')}
              
            />
            <FormLabel htmlFor='startDate'>Start Date</FormLabel>
            <input type='date' {...register('startDate', { required: true })}  onBlur={handleInputChange}/>
            {errors.startDate && <span>This field is required</span>}
            <FormLabel htmlFor='endDate'>End Date</FormLabel>

            <input type='date' {...register('endDate', { required: true })}  onBlur={handleInputChange}/>
            {errors.endDate && <span>This field is required</span>}
            <FormLabel htmlFor='price'>Price</FormLabel>

            <input type='number' {...register('price', { required: true })}  onBlur={handleInputChange} />
            {errors.price && <span>This field is required</span>}
            <br />

            <input
              type='file'
              {...register('image', { required: true })}
              onChange={handleFileChange}
            />
            {errors && <span>This field is required</span>}

            {fileInputValue && (
              <div>
                <h4>Image in the database</h4>
                <img
                  src={getValues('oldImage')}
                  alt='Preview'
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}

            <br />
            <button disabled={!isDirty || !isValid} /> 
            <button type='submit'>Update Vacation</button>
            
          </FormControl>
        </form>
        <DevTool control={control} />
      </Sheet>
    </div>
  );
}
