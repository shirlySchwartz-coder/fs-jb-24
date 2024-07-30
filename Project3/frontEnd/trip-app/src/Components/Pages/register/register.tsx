import { SubmitHandler, useForm } from 'react-hook-form';
import './register.css';
import notify from '../../utils/Notify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../../Models/User';

type userCred = {
  userName: string;
  userPass: string;
  passCheck: string;
  userRole: string;
  userEmail: string;
};
function Register(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userCred>();

  const fieldNeed = {
    required: true,
    minLength: 5,
    maxLength: 15,
  };

  const ErrorsNoticeRequired = 'This filed is required';
  const ErrorsNoticeMin = `This filed must contain more than ${fieldNeed.minLength}characters`;
  const ErrorsNoticeMax = `This filed cant contain more then ${fieldNeed.maxLength}characters`;

  const sendRegister: SubmitHandler<userCred> = (data) => {
    if (data.userPass !== data.passCheck) {
      notify.error('Password mismatch');
      return;
    }

    let sendData = {
      userName:data.userName,
      userPass:data.userPass,
      userRole:data.userRole,
      userEmail:data.userEmail,
  }
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
            placeholder='user name'
            {...register('userName', fieldNeed)}
          />
          {errors.userName?.type === 'required' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeRequired}</span>
            </>
          )}
          {errors.userName?.type === 'minLength' && (
            <>
              <br />
              <span style={{ color: 'red' }}>{ErrorsNoticeMin}</span>
            </>
          )}
          {errors.userName?.type === 'maxLength' && (
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
            type='password'
            placeholder='check password'
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
          <select
            defaultValue={'user'}
            {...register('userRole', { required: true })}
          >
            <option value='user'>User</option>
            <option value='Company'>Company</option>
            <option value='Admin'>Admin</option>
          </select>
          <hr />
          <input type='submit' value='register' />
        </form>
      </div>
    </div>
  );
}

export default Register;
