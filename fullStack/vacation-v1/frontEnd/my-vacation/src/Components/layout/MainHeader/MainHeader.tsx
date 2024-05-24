import { useState } from 'react';
import './MainHeader.css';

export function MainHeader(): JSX.Element {
  const [isLogged, setLogged] = useState(true);

  const logOutButton = () => {
    return <>
    <input type="button" value="Logout" />
    </>;
  };
  const logInButton = () => {
    return (
      <>
        <input type='button' value='Login' />
        <input type='button' value='Register' />
      </>
    );
  };

  return (
    <div className='MainHeader'>
      <p>Vacations App</p>
      <div>Hello user</div>
      <div>{isLogged ? logOutButton() : logInButton()}</div>
    </div>
  );
}
