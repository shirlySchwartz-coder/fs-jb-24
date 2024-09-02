import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.css';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { store } from '../../../redux/store';
import { AuthState, loginAction } from '../../../redux/loginReducer';
import { User } from '../../Models/User';

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const fieldNeed = {
    required: true,
    minLength: 4,
    maxLength: 35,
  };
  const ErrorsNoticeRequired = 'This filed is required';
  const ErrorsNoticeMin = `This filed must contain more than ${fieldNeed.minLength}`;
  const ErrorsNoticeMax = `This filed can't contain more then ${fieldNeed.maxLength}`;
  const LOGIN_URL = 'http://localhost:8080/api/v1/login/loginUser';
  //user name, user pass, remember me, user role:user,company,admin

  useEffect(() => {
    //if we have a valid token , we can navigate to the main page :)
    const token =store.getState().login.jwt;
    if (token.length>10){
      console.log('token in login from store:',token)
    }
    
  }, []);
  //use form methods and data type
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const makeLogin: SubmitHandler<User> = async (data) => {
    let result: any = await axios
      .post(LOGIN_URL, {
        userEmail: data.userEmail,
        userPass: data.userPass,
      })
      .then((res) => {
        const jwt = res.headers['authorization'];
        console.log('my jwt: ', jwt);

        new Notify({
          status: 'success',
          title: 'Login ',
          text: 'Login was successful',
          effect: 'fade',
          speed: 300,
          customClass: '',
          customIcon: '',
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          notificationsGap: NaN,
          notificationsPadding: NaN,
          type: 'outline',
          position: 'center',
          customWrapper: '',
        });
        store.dispatch(loginAction(res.data));
        console.log(res.data)
        if (rememberMe) {
          localStorage.setItem('jwt',jwt);
        } else {
          localStorage.removeItem('jwt');
          sessionStorage.setItem('jwt', jwt);
        }

        navigate('/vacationList');
      })
      .catch((err) => {
        console.log('err:', err);
      });
    //console.log('result:', result);
  };

  return (
    <div className='login Box'>
      <h1>Login User</h1>
      <hr />
      <form onSubmit={handleSubmit(makeLogin)}>
        <input
          type='text'
          placeholder='user email'
          {...register('userEmail', fieldNeed)}
        />
        {errors.userEmail?.type === 'required' && (
          <>
            <br />
            <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
          </>
        )}
        {errors.userEmail?.type === 'minLength' && (
          <>
            <br />
            <span style={{ color: 'red' }}>{ErrorsNoticeMin}</span>
          </>
        )}
        {errors.userEmail?.type === 'maxLength' && (
          <>
            <br />
            <span style={{ color: 'red' }}>{ErrorsNoticeMax}</span>
          </>
        )}
        <br />
        <br />
        <input
          type='password'
          placeholder='user password'
          {...register('userPass', fieldNeed)}
        />
        {errors.userPass?.type === 'required' && (
          <>
            <br />
            <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
          </>
        )}
        {errors.userPass?.type === 'minLength' && (
          <>
            <br />
            <span style={{ color: 'red' }}>{ErrorsNoticeMin}</span>
          </>
        )}
        {errors.userPass?.type === 'maxLength' && (
          <>
            <br />
            <span style={{ color: 'red' }}>{ErrorsNoticeMax}</span>
          </>
        )}
        <br />
        <br />
        <input
          type='checkbox'
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
        <hr />
        <input type='submit' value='login' />
      </form>
    </div>
  );
}
