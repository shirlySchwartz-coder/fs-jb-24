import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import notify from '../../utils/Notify';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { store } from '../../../redux/store';
import { AuthState, loginAction } from '../../../redux/loginReducer';
import { User } from '../../Models/User';

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const [rememberMe,setRememberMe]=useState(false)
  
  //user name, user pass, remember me, user role:user,company,admin
  

  useEffect(() => {
    //if we have a valid token , we can navigate to the main page :)
  }, []);
  //use form methods and data type
  const {register,handleSubmit,formState: { errors },} = useForm<User>();

  const makeLogin: SubmitHandler<User> = (data) => {
    //handle remember me...
    console.log(data);
    
    axios
      .post('http://localhost:8080/api/v1/login/loginUser', {
        userEmail: data.userEmail,
        userPass: data.userPass,
      })
      .then((res) => {
        console.log('my result:', res.data);
        //update the redux
        //store.dispatch(loginAction(res.data));
        const jwt = res.headers["Authorization"];
        //const jwt = res.data.jwt;
        if (rememberMe) {
          localStorage.setItem('jwt', jwt);
        } else {
          localStorage.removeItem('jwt');
          sessionStorage.setItem('jwt', jwt);
        }
        notify.success('Welcome ${data.userName}');
        navigate('/vacationList');
      })
      .catch((err) => {
        notify.error('Something went wrong');
      });
  };

  const fieldNeed = {
    required: true,
    minLength: 4,
    maxLength: 35,
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
            <span style={{ color: 'red' }}>you must write email</span>
          </>
        )}
        {errors.userEmail?.type === 'minLength' && (
          <>
            <br />
            <span style={{ color: 'red' }}>
              user name must be 5 char minimum
            </span>
          </>
        )}
        {errors.userEmail?.type === 'maxLength' && (
          <>
            <br />
            <span style={{ color: 'red' }}>
              user name must be 15 char maximum
            </span>
          </>
        )}
        <br />
        <br />
        <input
          type='password'
          placeholder='user password'
          {...register('userPass', {
            required: true,
            minLength: 5,
            maxLength: 10,
          })}
        />
        {errors.userPass && (
          <>
            <br />
            <span style={{ color: 'red' }}>WTF?</span>
          </>
        )}
        <br />
        <br />
       
        
        <input type='checkbox' onChange={(e)=>setRememberMe(e.target.checked)} />
        Remember me
        <hr />
        <input type='submit' value='login' />
      </form>
    </div>
  );
}

