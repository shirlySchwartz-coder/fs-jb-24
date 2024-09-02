import './AddVacation.css';
import { DevTool } from '@hookform/devtools';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import vars from '../../utils/Variants';

//
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Sheet from '@mui/joy/Sheet';
import { useEffect, useState } from 'react';
import { CheckJWT } from '../../utils/JWT';
import { store } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';

export function AddVacation(): JSX.Element {
  let today = '2024-09-01';
  let oneYearMax = '2025-09-01';
  const navigate = useNavigate();
  const [file, setFile] = useState();
  
  type VacationInput = {
    vacationId:0;
    destination: string;
    vacInfo: string;
    startDate: Date;
    endDate: Date;
    price: number;
    //pictureUrl: string;
    picture: string;
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VacationInput>();
  const onSubmit: SubmitHandler<VacationInput> = async (
    data: VacationInput
  ) => {
    console.log(data);
    if (!CheckJWT()) {
      navigate('/login');
      return;
    }
    let token = store.getState().login.jwt;
    //let id = store.getState().login.userId;
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/dashboard/addVacation', data,{
        headers:{ 'Authorization': `${token}`}});
      console.log('Vacation added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding vacation:', error);
      throw error;
    }
  };
  useEffect(() => {
    if (!CheckJWT()) {
      navigate('/login');
      return;
    }
   
  }, []);

  return (
    <div className='AddVacation'>
      <main>
        <CssBaseline />
        <Sheet
          sx={{
            width: 600,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant='outlined'
        >
          <div>
            <Typography level='h4' component='h1'>
              <b>Add New Vacation</b>
              <p></p>
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor='destination'>Destination</FormLabel>
              <input
                id='destination'
                type='text'
                {...register('destination', {
                  required: true,
                  maxLength: 20,
                  minLength: 2,
                })}
              />
              {errors.destination?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
              {errors.destination?.type === 'maxLength' && (
                <span className='error-text'>Max length exceeded</span>
              )}
              {errors.destination?.type === 'minLength' && (
                <span className='error-text'>Min length exceeded</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='vacInfo'>Vacation Info</FormLabel>

              <TextField
                id='vacInfo'
                multiline
                rows={4}
                variant='filled'
                {...register('vacInfo', {
                  required: true,
                  maxLength: 2500,
                  minLength: 2,
                })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
              {errors.vacInfo?.type === 'maxLength' && (
                <span className='error-text'>Max length exceeded</span>
              )}
              {errors.vacInfo?.type === 'minLength' && (
                <span className='error-text'>Min length exceeded</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='startDate'>Start Date</FormLabel>
              <input
                id='startDate'
                type='date'
                min={today}
                {...register('startDate', { required: true })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='endDate'>End Date</FormLabel>
              <input
                id='endDate'
                type='date'
                max={oneYearMax}
                {...register('endDate', { required: true })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='price'>Price</FormLabel>
              <input
                id='price'
                type='number'
                {...register('price', { required: true })}
              />
              {errors.vacInfo?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='pictureUrl'>Picture to upload</FormLabel>
              
              <input
                id='picture'
                type='file'
                {...register('picture', {
                  required: true,
                 
                })}
              />
              
             {/* 
              {errors.pictureUrl?.type === 'required' && (
                <span className='error-text'>This is required</span>
              )}
              {errors.pictureUrl?.type === 'maxLength' && (
                <span className='error-text'>Max length exceeded</span>
              )}
              {errors.pictureUrl?.type === 'minLength' && (
                <span className='error-text'>Min length exceeded</span>
              )} */}
            </FormControl>

            <br />
            <input type='submit' value='Submit' className='submit-btn' />
          </form>

          <DevTool control={control} />
        </Sheet>
      </main>
    </div>
  );
}
