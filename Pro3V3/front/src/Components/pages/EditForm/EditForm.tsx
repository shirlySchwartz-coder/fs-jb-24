import setting from '../../utils/Setting';
import './EditForm.css';
import { CssBaseline, TextField } from '@mui/material';
import { Sheet, FormControl, FormLabel } from '@mui/joy';
import { useEffect, useState } from 'react';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import { store } from '../../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CheckJWT } from '../../utils/JWT';
import vars from '../../utils/Variants';
import { toast } from 'react-toastify';
import { getValue } from '@testing-library/user-event/dist/utils';
let renderCount = 0;
interface VacationUpdateInput {
  vacationId: number;
  destination: string;
  vacInfo: string;
  startDate: string;
  endDate: string;
  price: number;
  image: File | null;
  oldImage: string;
}

export function EditForm(): JSX.Element {
  let token = store.getState().login.jwt;
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [apiValue, setApiValue] = useState<VacationUpdateInput>();
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState('');
  

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<VacationUpdateInput>({
    defaultValues: async () => await getVacData(),
  });

  const getVacData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/dashBoard/edit/` + id,
      {
        headers: { 'Authorization': `${token}` },
      }
    );
    const dataFromServer = response.data[0];
    console.log('dataFromServer:', dataFromServer);
    return {
      vacationId: dataFromServer.vacationId,
      destination: dataFromServer.destination,
      vacInfo: dataFromServer.vacInfo,
      startDate: new Date(dataFromServer.startDate).toISOString().split('T')[0],
      endDate: new Date(dataFromServer.endDate).toISOString().split('T')[0],
      price: dataFromServer.price,
      image: null,
      oldImage: dataFromServer.pictureUrl,
    };
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    //const fileInputValue = watch('oldImage')
    return () => subscription.unsubscribe();
  }, [watch]);
  //get default values

  const onSubmit: SubmitHandler<VacationUpdateInput> = async (data) => {
    console.log(imageFile, data);
    const formData = new FormData();
    formData.append('vacationId', String(data.vacationId));
    formData.append('destination', data.destination);
    formData.append('vacInfo', data.vacInfo);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('price', String(data.price));
    if (data.image && imageFile?.name) {
      formData.append('image', imageFile);
    }
    setMsg('Uploading...');
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    try {
      const response = await axios.post(vars.UPDATE_VAC_URL + id, formData, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            setProgress((prevState) => {
              return {
                ...prevState,
                pc: progressEvent.total
                  ? (progressEvent.loaded / progressEvent.total) * 100
                  : 0,
              };
            });
          }
        },
      });
      let upDated = response.status;
      if(upDated===201){
         console.log(upDated);
      toast.success('Vacation updated successfully!');
      navigate('/vacations');
      }
     
    } catch (error) {
      toast.error('Update did not succeed!');
      throw new Error('Update did not succeed');
      
    }
  };

  renderCount++;
  return (
    <div className='EditForm'>
      <h2>Edit Vacation- render:{renderCount / 2}</h2>
      <CssBaseline />
      <Sheet variant='outlined' sx={setting.SheetValues.sx}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormLabel>Vacation Number: {id}</FormLabel>
          <FormControl style={{ marginBottom: '20px' }}>
            <FormLabel htmlFor='destination'>Destination</FormLabel>
            <input
              {...register('destination', {
                required: {
                  value: true,
                  message: 'Destination is required',
                },
                minLength: {
                  value: 2,
                  message: 'Destination should be longer then 2',
                },
              })}
            />
            {errors.destination?.message && (
              <p className='edit-error'>{errors.destination.message}</p>
            )}
          </FormControl>
          <FormControl style={{ marginBottom: '20px' }}>
            <FormLabel htmlFor='vacInfo'>Vacation Info</FormLabel>
            <TextField
              multiline
              maxRows={6}
              rows={6}
              {...register('vacInfo', {
                required: {
                  value: true,
                  message: 'Vacation Info is required',
                },
                pattern:{
                  value:/[^=]*/i ,
                  message:'You cant enter special chares- please fix the text'
                } 

              })}
            />
            {errors.vacInfo?.message && (
              <p className='edit-error'>{errors.vacInfo.message}</p>
            )}
          </FormControl>
          <FormControl style={{ marginBottom: '20px' }}>
            <FormLabel htmlFor='startDate'>Start Date</FormLabel>
            <input
              type='date'
              {...register('startDate', {
                required: {
                  value: true,
                  message: 'Start Date is required',
                },
              })}
            />
            {errors.startDate?.message && (
              <p className='edit-error'>{errors.startDate.message}</p>
            )}
          </FormControl>
          <FormControl style={{ marginBottom: '20px' }}>
            <FormLabel htmlFor='endDate'>End Date</FormLabel>
            <input
              type='date'
              {...register('endDate', {
                required: {
                  value: true,
                  message: 'End Date is required',
                },
              })}
            />
            {errors.endDate?.message && (
              <p className='edit-error'>{errors.endDate.message}</p>
            )}
          </FormControl>

          <FormControl style={{ marginBottom: '20px' }}>
            <FormLabel htmlFor='price'>Price</FormLabel>

            <input
              type='number'
              {...register('price', {
                required: {
                  value: true,
                  message: 'Vacation Info is required',
                },
              })}
            />
            {errors.price?.message && (
              <p className='edit-error'>{errors.price.message}</p>
            )}
          </FormControl>
          <FormControl style={{ marginBottom: '20px' }}>
            <input
              type='file'
              {...register('image',{
                required: {
                  value: true,
                  message: 'Image File  is required',
                },
              })}
              accept='image/png, image/jpeg'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />
            {errors.image?.message && (
              <p className='edit-error'>This field is required</p>
            )}
          </FormControl>
           {/* (fileInputValue) && (
            <div>
              <h4>תמונה במסד הנתונים</h4>
              <img
                src={getValue('oldImage') || ''}
                alt='תצוגה מקדימה'
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          )*/}
            
          <br />
          <button type='submit'>Update Vacation</button>
          {progress.started && <progress max="100" value={progress.pc}></progress>}
        </form>
       
      
        <DevTool control={control} />
      </Sheet>
    </div>
  );
}
