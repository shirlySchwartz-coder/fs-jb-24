import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import notify from '../../utils/Notify';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { store } from '../../../redux/store';
import { AuthState, loginAction } from '../../../redux/loginReducer';

function Login(): JSX.Element {
  const navigate = useNavigate();
  //user name, user pass, remember me, user role:user,company,admin
  type userCred = {
    userName: string;
    userPass: string;
    userRole: string;
    rememberMe: boolean;
  };
  useEffect(() => {
    //if we have a valid token , we can navigate to the main page :)
  }, []);
  //use form methods and data type
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userCred>();
  const makeLogin: SubmitHandler<userCred> = (data) => {
    //handle remember me...
    axios
      .post('http://localhost:8080/api/v1/login/loginUser', {
        userName: data.userName,
        userPass: data.userPass,
      })
      .then((res) => {
        console.log('my result:', res.data);
        //update the redux
        store.dispatch(loginAction(res.data));
        //const jwt = res.headers["Authorization"];
        const jwt = res.data.jwt;
        if (data.rememberMe) {
          localStorage.setItem('jwt', jwt);
        } else {
          localStorage.removeItem('jwt');
          sessionStorage.setItem('jwt', jwt);
        }
        notify.success('Welcome ${data.userName}');
        navigate('/main');
      })
      .catch((err) => {
        notify.error('Somthing went wrong');
      });
  };

  const fieldNeed = {
    required: true,
    minLength: 4,
    maxLength: 15,
  };

  return (
    <div className='login Box'>
      <h1>Login User</h1>
      <hr />
      <form onSubmit={handleSubmit(makeLogin)}>
        <input
          type='text'
          placeholder='user name'
          {...register('userName', fieldNeed)}
        />
        {errors.userName?.type === 'required' && (
          <>
            <br />
            <span style={{ color: 'red' }}>you must write user name</span>
          </>
        )}
        {errors.userName?.type === 'minLength' && (
          <>
            <br />
            <span style={{ color: 'red' }}>
              user name must be 5 char minimum
            </span>
          </>
        )}
        {errors.userName?.type === 'maxLength' && (
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
        <input type='checkbox' {...register('rememberMe')} />
        Remember me
        <hr />
        <input type='submit' value='login' />
      </form>
    </div>
  );
}
export default Login;
