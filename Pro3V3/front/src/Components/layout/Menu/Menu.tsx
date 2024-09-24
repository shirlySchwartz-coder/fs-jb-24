import { NavLink, useNavigate } from 'react-router-dom';
import './Menu.css';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import { store } from '../../../redux/store';
import { useEffect, useState } from 'react';

export function Menu(): JSX.Element {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [initial, setInitial] = useState(true);
  const navigate = useNavigate();
  store.subscribe(() => {
    setIsAdmin(store.getState().login.isAdmin);
    setIsLogged(store.getState().login.isLogged);
  });

  const adminDbMenu = () => {
    return (
      <>
        <h3>Admin Menu</h3>
        <br />
        <MenuList>
          <MenuItem>
            <NavLink to='/addVacation'>Add Vacation</NavLink>
          </MenuItem>
         
          <MenuItem>
            <NavLink to='/reports'>Reports</NavLink>
          </MenuItem>
        </MenuList>
        <hr />
      </>
    );
  };

  const userMenu = () => {
    return (
      <>
        User Menu
        <MenuList>
          <MenuItem>
            <NavLink to='/vacations'>Vacations list</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to='/login'>Login</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to='/register'>Register</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to='/about'>About</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to='/contact'>Contact me</NavLink>
          </MenuItem>
        </MenuList>
      </>
    );
  };

  return (
    <div className='Menu'>
      <div>{isAdmin ? adminDbMenu() : userMenu()}</div>
    </div>
  );
}
