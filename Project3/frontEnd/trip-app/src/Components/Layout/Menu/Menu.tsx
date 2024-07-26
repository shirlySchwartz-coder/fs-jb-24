import { NavLink } from 'react-router-dom';
import './Menu.css';
import { Divider, MenuItem, MenuList } from '@mui/material';

export function Menu(): JSX.Element {
  return (
    <div className='Menu'>
      <MenuList>
        <MenuItem>
          <NavLink to='/bookList'>Book list</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to='/addBook'>Add book</NavLink>
        </MenuItem>
        <Divider />
        <MenuItem>
          <NavLink to='/authorsList'>Authors list</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to='/addAuthor'>Add author</NavLink>
        </MenuItem>
      </MenuList>
      <hr />
    </div>
  );
}
