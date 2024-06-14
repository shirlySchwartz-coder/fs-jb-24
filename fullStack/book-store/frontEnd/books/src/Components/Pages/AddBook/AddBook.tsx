import axios from 'axios';
import './AddBook.css';
import { useEffect, useState } from 'react';
import { Author } from '../../Models/Author';

export function AddBook(): JSX.Element {
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/author/all')
      .then((response) => response.data)
      .then((data) => setAuthors(data));
  }, []);
  return (
    <div className='AddBook'>
      <h1>Add Book</h1>
      <form>
        <input type='text' placeholder='Book Name' />
        <br />
        <br />
        <input type='number' placeholder='Total Pages' />
        <br />
        <br />
        <input type='number' placeholder='Book Price' />
        <br />
        <br />
        <select>
          {authors.map((item) => (
            <option value={item.authorId}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button>Add Book</button>
      </form>
    </div>
  );
}
