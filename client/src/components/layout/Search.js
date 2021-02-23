import React, { useContext, useRef } from 'react';
import BookContext from '../context/book/BookContext';
import AlertContext from '../context/alert/AlertContext';

const Search = () => {
  const bookContext = useContext(BookContext);
  const { books, clearBooks, getBooks } = bookContext;
  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlert } = alertContext;
  const text = useRef('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.current.value !== '') {
      getBooks(text.current.value.trim().replace(' ', '+'));
    } else {
      setAlert('Please enter a search text.');
      setTimeout(() => {
        clearAlert();
      }, 5000);
    }
  };
  const onClick = () => {
    text.current.value = '';
    clearBooks();
  };

  return (
    <div className='search-box'>
      <form onSubmit={onSubmit}>
        <input
          ref={text}
          type='text'
          placeholder='Search for a book/author'
          className='search-field'
        />
        <input type='submit' value='Search' className='search-btn' />
        {books.length !== 0 ? (
          <input
            type='submit'
            value='Clear'
            className='search-btn'
            onClick={onClick}
          />
        ) : null}
      </form>
    </div>
  );
};

export default Search;
