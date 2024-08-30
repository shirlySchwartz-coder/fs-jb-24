import { NavLink } from 'react-router-dom';
import './Menu.css';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';

export function Menu(): JSX.Element {
  return (
    <div className='Menu'>
      User Menu
      <MenuList>
        <MenuItem>
          <NavLink to='/vacationList'>Vacations list</NavLink>
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
      <hr />
      Admin Menu
      <MenuList>
        <MenuItem>
          <NavLink to='/addVacation'>Add Vacation</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to='/updateVacation'>Update Vacation</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to='/reports'>Reports</NavLink>
        </MenuItem>
      </MenuList>
      <hr />
    </div>
  );
}
