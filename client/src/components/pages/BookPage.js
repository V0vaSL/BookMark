import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BookContext from '../context/book/BookContext';
import UserContext from '../context/user/UserContext';

const BookPage = () => {
  const bookContext = useContext(BookContext);
  const { curBook } = bookContext;
  const userContext = useContext(UserContext);
  const { addBookToUser } = userContext;
  const {
    bookId,
    description,
    title,
    authors,
    publisher,
    publishedDate,
    pageCount,
    imageLink,
    categories,
    averageRating,
  } = curBook;
  const history = useHistory();

  const onClick = (e) => {
    if (e.target.value === 'Add') {
      const readingList = document.querySelector('#readingList').value;

      addBookToUser(readingList, {
        bookId,
        description,
        title,
        authors,
        publisher,
        publishedDate,
        pageCount,
        imageLink,
        categories,
        averageRating,
      });
      history.push('/library/');
    } else {
      history.goBack();
    }
  };

  return (
    <div className='book-page'>
      <div className='book-info-container'>
        <img src={imageLink} alt='Book cover' />
        <div className='book-info'>
          <h1>{title ? title : 'N/A'}</h1>
          <br />
          <p>Authors: {authors ? authors : 'N/A'} </p>
          <p>Publisher: {publisher ? publisher : 'N/A'}</p>
          <p>
            Published: {publishedDate ? publishedDate.substring(0, 4) : 'N/A'}
          </p>
          <p>Pages: {pageCount ? pageCount : 'N/A'}</p>
          <p>Categories: {categories ? categories : 'N/A'}</p>
          <p>Rating: {averageRating ? averageRating : 'N/A'}</p>
        </div>
      </div>
      <div className='links'>
        <input type='submit' className='btn' onClick={onClick} value='Back' />
        <select name='readingList' id='readingList'>
          <option value='readingList'>Reading</option>
          <option value='wishList'>Wishlist</option>
          <option value='completedList'>Completed</option>
        </select>
        <input type='submit' className='btn' onClick={onClick} value='Add' />
      </div>
      <div className='description'>
        <p>
          Description: <br />
          <br /> {description ? description : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default BookPage;
