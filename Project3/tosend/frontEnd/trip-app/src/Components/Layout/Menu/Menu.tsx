import { NavLink } from 'react-router-dom';
import './Menu.css';
import { Divider, MenuItem, MenuList } from '@mui/material';

export function Menu(): JSX.Element {
  return (
    <div className='Menu'>
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
      </MenuList>
      <hr />
    </div>
  );
}
