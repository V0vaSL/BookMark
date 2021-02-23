import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BookContext from '../context/book/BookContext';
import UserContext from '../context/user/UserContext';

const LibraryItem = (props) => {
  const bookContext = useContext(BookContext);
  const history = useHistory();
  const { setCurrent } = bookContext;
  const userContext = useContext(UserContext);
  const { removeBookFromUser } = userContext;
  const { title, authors, publishedDate } = props.book;

  const onClick = (e) => {
    if (e.target.getAttribute('id') !== 'delete') {
      const curBook = {
        ...props.book,
        bookId: props.bookId,
        imageLink: props.image,
      };
      setCurrent(curBook);
      history.push(`/book/${title}`);
    } else {
      removeBookFromUser(props.list, props.bookId);
    }
  };

  return (
    <div className='book-grid-item'>
      {props.image ? (
        <img src={props.image} alt='book cover' onClick={onClick} />
      ) : (
        <i className='far fa-bookmark fa-9x'></i>
      )}
      <h2>{title ? title : 'N/A'}</h2>
      <p>{authors ? authors : 'N/A'}</p>
      <p>{publishedDate ? publishedDate.substring(0, 4) : 'N/A'}</p>
      <i id='delete' className='fas fa-trash-alt btn' onClick={onClick}></i>
    </div>
  );
};

export default LibraryItem;
