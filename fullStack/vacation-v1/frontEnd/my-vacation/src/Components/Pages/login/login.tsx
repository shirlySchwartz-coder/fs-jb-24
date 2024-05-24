import './login.css';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type DataToLogin = {
  userName: string;
  userPass: string;
  rememberMe: boolean;
};

export function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataToLogin>();
  const [data, setData] = useState<DataToLogin>();

  const fieldNeed = {
    required: true,
    minLength: 5,
    maxLength: 15,
  };

  const ErrorsNoticeRequired = 'This filed is required';
  const ErrorsNoticeMin = `This filed must be ${fieldNeed.minLength} characters or more`;
  const ErrorsNoticeMax = `This filed must be ${fieldNeed.maxLength} characters or less`;

  const sendLogin: SubmitHandler<DataToLogin> = (data) => {
    setData(data);
    console.log(data);
    console.log(errors)
  };

  return (
    <div className='login Box'>
      <form onSubmit={handleSubmit(sendLogin)}>
        <input
          {...register('userName', fieldNeed)}
          placeholder='User name'
        />
        {errors.userName?.type === 'required' && (
          <>
            <br />
            <span className='errorFiled'>{ErrorsNoticeRequired}</span>
          </>
        )}
        {errors.userName?.type === 'minLength' && (
          <>
            <br />
            <span className='errorFiled'>{ErrorsNoticeMin}</span>
          </>
        )}
        {errors.userName?.type === 'maxLength' && (
          <>
            <br />
            <span className='errorFiled'>{ErrorsNoticeMax}</span>
          </>
        )}
        <br />
        <br />
        <input {...register('userPass',fieldNeed)} placeholder='Password' />
        {errors.userPass?.type === 'required' && (
            <>
              <br />
              <span className='errorFiled'>{ErrorsNoticeRequired}</span>
            </>
          )}
          {errors.userPass?.type === 'minLength' && (
            <>
              <br />
              <span className='errorFiled'>{ErrorsNoticeMin}</span>
            </>
          )}
          {errors.userPass?.type === 'maxLength' && (
            <>
              <br />
              <span className='errorFiled'>{ErrorsNoticeMax}</span>
            </>
          )}
        <br />
        <br />
        <input type='checkbox' {...register('rememberMe')} />
        Remember me
        <br />
        <br />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}
