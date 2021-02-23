import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BookContext from '../context/book/BookContext';

const BookGridItem = (props) => {
  const bookContext = useContext(BookContext);
  const history = useHistory();
  const { setCurrent } = bookContext;
  const { title, authors, publishedDate } = props.book;
  const onClick = () => {
    const curBook = {
      ...props.book,
      bookId: props.bookId,
      imageLink: props.image,
    };
    setCurrent(curBook);
    history.push(`/book/${title}`);
  };

  return (
    <div className='book-grid-item' onClick={onClick}>
      {props.image ? (
        <img src={props.image} alt='book cover' />
      ) : (
        <i className='far fa-bookmark fa-9x'></i>
      )}
      <h2>{title ? title : 'N/A'}</h2>
      <p>{authors ? authors : 'N/A'}</p>
      <p>{publishedDate ? publishedDate.substring(0, 4) : 'N/A'}</p>
    </div>
  );
};

export default BookGridItem;
