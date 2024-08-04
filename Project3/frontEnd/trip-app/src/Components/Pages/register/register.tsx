import { SubmitHandler, useForm } from 'react-hook-form';
import './Register.css';
import notify from '../../utils/Notify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../../Models/User';
import { UserReg } from '../../Models/UserReg';

type userForm = {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPass: string;
  passCheck: string;
  userRole?: boolean;
};
export function Register(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userForm>();

  const fieldNeed = {
    required: true,
    minLength: 5,
    maxLength: 15,
  };

  const ErrorsNoticeRequired = 'This filed is required';
  const ErrorsNoticeMin = `This filed must contain more than ${fieldNeed.minLength}characters`;
  const ErrorsNoticeMax = `This filed cant contain more then ${fieldNeed.maxLength}characters`;

  const sendRegister: SubmitHandler<userForm> = (data) => {
    console.log(data);
    if (data.userPass !== data.passCheck) {
      notify.error('Password mismatch');
      return;
    }

    let sendData: UserReg = {
      id: 0,
      userFirstName: data.firstName,
      userLastName: data.lastName,
      userEmail: data.userEmail,
      userPassword: data.userPass,
      isAdmin: data.userRole,
    };
    console.log(sendData);
    //go to axios and send the information....
    axios
      .post('http://localhost:8080/api/v1/login/registerUser', sendData)
      .then((res) => {
        notify.success('User was registered successfully');
        navigate('/');
      })
      .catch((err) => {
        notify.error('Error accord while registering the user');
        console.log(err);
      });
  };

  return (
    <div className='register'>
      <div className='Box'>
        <h1>Register user</h1>
        <hr />
        <form onSubmit={handleSubmit(sendRegister)}>
          <input
            type='text'
            placeholder='First Name'
            {...register('firstName', fieldNeed)}
          />
          {errors.firstName?.type === 'required' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
            </>
          )}
          {errors.firstName?.type === 'minLength' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeMin}</span>
            </>
          )}
          {errors.firstName?.type === 'maxLength' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeMax}</span>
            </>
          )}
          <br />
          <br />
          <input
            type='text'
            placeholder='Last Name'
            {...register('lastName', fieldNeed)}
          />
          {errors.lastName?.type === 'required' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
            </>
          )}
          {errors.lastName?.type === 'minLength' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeMin}</span>
            </>
          )}
          {errors.lastName?.type === 'maxLength' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeMax}</span>
            </>
          )}
          <br />
          <br />
          <input
            type='text'
            placeholder='user email'
            {...register('userEmail', { required: true })}
          />
          {errors.userEmail?.type === 'required' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
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
            type='password'
            placeholder='Confirm password'
            {...register('passCheck', { required: true })}
          />
          {errors.passCheck?.type === 'required' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
            </>
          )}
          <br />
          <br />

          <br />
          <select {...register('userRole', { required: true })}>
            <option value='0' selected>
              User
            </option>

            <option value='1'>Admin</option>
          </select>
          <hr />
          <input type='submit' value='Send' />
        </form>
      </div>
    </div>
  );
}
