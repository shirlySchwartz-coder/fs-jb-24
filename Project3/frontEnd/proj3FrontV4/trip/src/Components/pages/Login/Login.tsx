import './Login.css';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/joy/Checkbox';
import {
  ErrorsNoticeMax,
  ErrorsNoticeMin,
  ErrorsNoticeRequired,
} from '../../utils/data';

export function Login(): JSX.Element {
 
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  interface IFormInput {
    email: string;
    password: string;
  }

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log('You are trying to login');
    console.log('data from form:', data);
    return(JSON.stringify(data)); // Add this line to update state with form data
  };
  return (
    <div className='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CssBaseline />

        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 0, // margin top & bottom
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
              <b>Welcome!</b>
            </Typography>
            <Typography level='body-sm'>Sign in to continue.</Typography>
          </div>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              type='email'
              placeholder='johndoe@email.com'
              {...register('email', {
                required: true,
                maxLength: 40,
                minLength: 5,
              })}
            />
            {errors.email?.type === 'required' && (
              <>
                <br />
                <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
              </>
            )}
            {errors.email?.type === 'minLength' && (
              <>
                <br />
                <span style={{ color: 'red' }}>{ErrorsNoticeMin}</span>
              </>
            )}
            {errors.email?.type === 'maxLength' && (
              <>
                <br />
                <span style={{ color: 'red' }}>{ErrorsNoticeMax}</span>
              </>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              type='password'
              placeholder='password'
              {...register('password', {
                required: true,
                maxLength: 40,
                minLength: 4,
              })}
            />
          </FormControl>
          <FormControl>
            <Checkbox
              label='Remember me'
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </FormControl>

          <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>

          <Typography
            endDecorator={<Link href='/register'>Sign up</Link>}
            fontSize='sm'
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </form>
    </div>
  );
}
