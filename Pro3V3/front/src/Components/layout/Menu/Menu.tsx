import { NavLink, useNavigate } from 'react-router-dom';
import './Menu.css';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import { store } from '../../../redux/store';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useEffect, useState } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function Menu(): JSX.Element {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [initial, setInitial] = useState(true);

  const navigate = useNavigate();
  store.subscribe(() => {
    setIsAdmin(store.getState().login.isAdmin);
    setIsLogged(store.getState().login.isLogged);
  });

  function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
      </SvgIcon>
    );
  }

  const adminDbMenu = () => {
    return (
      <>
        <h3>Admin Menu</h3>
        <br />
        <MenuList>
          <MenuItem>
            <NavLink to='/vacations'>
              <HomeIcon color='primary' />
            </NavLink>
          </MenuItem>
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
