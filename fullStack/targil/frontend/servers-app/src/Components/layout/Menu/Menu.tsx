import { MenuList, MenuItem, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export function Menu(): JSX.Element {
  return (
    <div className='Menu'>
      <h3>Menu</h3>
      <MenuList>
        <MenuItem>
          <NavLink to='/serversList'>Servers List</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to='/SingleServer'>Server Card</NavLink>
        </MenuItem>
        <Divider />
      </MenuList>
    </div>
  );
}
