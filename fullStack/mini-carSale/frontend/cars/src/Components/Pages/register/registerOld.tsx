import { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { error } from 'console';
import notify from '../../utils/Notify';
import axios from 'axios';

function RegisterOld(): JSX.Element {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userEmail, setUserEmail] = useState('');

  //geting and sending the user
  const checkUserCred = () => {
    if (userEmail && userName && userPass) {
      const userCred = {
        userEmail: userEmail,
        userName: userName,
        userPass: userPass,
      };
      console.log(userCred);

      axios
      .post("http://localhost:8080/api/v1/login/registerUser",userCred)
      .then((res)=>{
        localStorage.setItem("jwt",res.headers["authorization"])
        notify.success(`thank you ${userCred.userName} for creating a new account`)
      })
      .catch((error) => {
        notify.error("Bad user name or password")
      })

      console.log('ok');
      navigate('/main');
    } else {
      console.log('missing one of the details');
    }
  };

  return (
    <div className='register Box'>
      <h1>Register</h1>
      <hr />
      <input
        type='email'
        placeholder='user Email'
        onChange={(args) => setUserEmail(args.target.value)}
      />
      <br />
      <input
        type='text'
        placeholder='user name'
        onChange={(args) => setUserName(args.target.value)}
      />
      <br />
      <input
        type='password'
        placeholder='user password'
        onChange={(args) => setUserPass(args.target.value)}
      />
      <br />
      <hr />
      <input type='button' value='register' onClick={checkUserCred} />
      <br />
    </div>
  );
}

export default RegisterOld;
