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
        {imageLink ? (
          <img src={imageLink} alt='Book cover' />
        ) : (
          <i className='far fa-bookmark fa-9x'></i>
        )}
        <div className='book-info'>
          <h1>{title ? title : 'N/A'}</h1>
          <br />
          <p>
            <strong>Author : </strong> {authors ? authors : 'N/A'}{' '}
          </p>
          <p>
            <strong>Publisher : </strong> {publisher ? publisher : 'N/A'}
          </p>
          <p>
            <strong>Published : </strong>

            {publishedDate ? publishedDate.substring(0, 4) : 'N/A'}
          </p>
          <p>
            <strong>Pages : </strong> {pageCount ? pageCount : 'N/A'}
          </p>
          <p>
            <strong>Categories : </strong> {categories ? categories : 'N/A'}
          </p>
          <p>
            <strong>Rating : </strong> {averageRating ? averageRating : 'N/A'}
          </p>
        </div>
      </div>
      <div className='book-links'>
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
          <strong>Description:</strong> <br />
          <br /> {description ? description : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default BookPage;
