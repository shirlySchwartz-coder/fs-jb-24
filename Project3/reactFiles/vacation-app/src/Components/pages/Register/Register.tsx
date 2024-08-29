import "./Register.css";
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
//
//
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export function Register(): JSX.Element {
    type userInput = {
        firstName: string;
        lastName:string;
        email: string;
        password: string;
      };
    
      const fieldNeed = {
        required: true,
        minLength: 4,
        maxLength: 35,
      };
      const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<userInput>({
        mode: 'onChange',
      });

      const onSubmit: SubmitHandler<userInput> = (data: userInput) => {
        console.log(data);
      };  
    return (
        <div className="Register">
			 <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
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
            <b>Welcome!</b><p></p>
          </Typography>
          <Typography level='body-sm'>Register your account</Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor='firstName'>First Name</FormLabel>
            <input
              id='firstName'
              {...register('firstName', fieldNeed)}
            />
            {errors.firstName?.type === 'required' && (
              <span className='error-text'>This is required</span>
            )}
            { errors.firstName?.type === 'maxLength' && (
              <span className='error-text'>Max length exceeded</span>
            )}
            { errors.firstName?.type === 'minLength' && (
              <span className='error-text'>Min length exceeded</span>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='lastName'>Last Name</FormLabel>
            <input
              id='lastName'
              {...register('lastName', fieldNeed)}
            />
            {errors.lastName?.type === 'required' && (
              <span className='error-text'>This is required</span>
            )}
            { errors.lastName?.type === 'maxLength' && (
              <span className='error-text'>Max length exceeded</span>
            )}
            { errors.lastName?.type === 'minLength' && (
              <span className='error-text'>Min length exceeded</span>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <input
              id='email'
              {...register('email', fieldNeed)}
            />
            {errors.email?.type === 'required' && (
              <span className='error-text'>This is required</span>
            )}
            { errors.email?.type === 'maxLength' && (
              <span className='error-text'>Max length exceeded</span>
            )}
            { errors.email?.type === 'minLength' && (
              <span className='error-text'>Min length exceeded</span>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <input
              type='password'
              id='password'
              {...register('password', { required: true, maxLength: 30 })}
            />
            {errors.password?.type === 'required' && (
              <span className='error-text'>This is required</span>
            )}
            { errors.password?.type === 'maxLength' && (
              <span className='error-text'>Max length exceeded</span>
            )}
            { errors.password?.type === 'minLength' && (
              <span className='error-text'>Min length exceeded</span>
            )}
          </FormControl>
         <br />
          <input type='submit' value='Submit' className='submit-btn'/>
        </form>
       
        <DevTool control={control} />
      </Sheet>
    </main>
        </div>
    );
}
