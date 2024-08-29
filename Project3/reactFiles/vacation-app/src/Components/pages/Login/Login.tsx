import './Login.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export function Login(): JSX.Element {
  type userInput = {
    email: string;
    password: string;
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email'>email</label>
        <input
          id='email'
          {...register('email', { required: true, maxLength: 30 })}
        />
        {errors.email && errors.email.type === 'required' && (
          <span>This is required</span>
        )}
        {errors.email && errors.email.type === 'maxLength' && (
          <span>Max length exceeded</span>
        )}

        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          {...register('password', { required: true, maxLength: 30 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <span>This is required</span>
        )}
        {errors.password && errors.password.type === 'maxLength' && (
          <span>Max length exceeded</span>
        )}
        <input type='submit' value='Submit' />
      </form>
      <DevTool control={control} />
    </div>
  );
}
