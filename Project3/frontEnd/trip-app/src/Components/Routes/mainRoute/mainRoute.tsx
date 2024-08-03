import './mainRoute.css';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../Pages/Page404/Page404';
import {Login} from '../../Pages/login/login';
import { VacationList } from '../../Pages/VacationList/VacationList';
import { Register } from '../../Pages/Register/Register';

export function MainRoute(): JSX.Element {
  return (
    <div className='mainRoute'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/vacationList' element={<VacationList />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}
