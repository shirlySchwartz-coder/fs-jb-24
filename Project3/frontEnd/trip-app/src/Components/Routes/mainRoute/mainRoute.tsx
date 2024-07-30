import './mainRoute.css';
import { Route, Routes } from 'react-router-dom';

import { AddBook } from '../../Pages/AddBook/AddBook';
import { AuthorsList } from '../../Pages/AuthorsList/AuthorsList';
import { BookList } from '../../Pages/BookList/BookList';
import { Page404 } from '../../Pages/Page404/Page404';
import Login  from  '../../Pages/login/login';

export function MainRoute(): JSX.Element {
  return (
    <div className='mainRoute'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/addBook' element={<AddBook />} />
        <Route path='/bookList' element={<BookList />} />

        <Route path='/authorsList' element={<AuthorsList />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}
