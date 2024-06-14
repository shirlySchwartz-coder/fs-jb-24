import { Books } from '../../Models/Books';
import './SingleBook.css';

interface bookProps {
  book: Books;
}

export function SingleBook(props:bookProps): JSX.Element {
  return (
    <div className='SingleBook'>
      <h1>{props.book.book_name}</h1>
      <hr />
      <i>
        <b>
          {props.book.firstName} {props.book.lastName}
        </b>
      </i>
      <p>{props.book.total_pages}</p>
      <p>{props.book.book_price}</p>
    </div>
  );
}
