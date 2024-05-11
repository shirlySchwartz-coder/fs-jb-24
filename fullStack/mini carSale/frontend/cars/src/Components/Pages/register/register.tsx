import { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

function Register(): JSX.Element {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userEmail, setUserEmail] = useState('');

  //geting and sending the user
  const checkUserCred = () => {
    const userCred = {
      userEmail: userEmail,
      userName: userName,
      userPass: userPass,
    };

    console.log(userCred);
    if (userCred.userEmail && userCred.userName && userCred.userPass) {
      console.log('ok');
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

export default Register;
