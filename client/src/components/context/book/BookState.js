import React, { useReducer, useContext } from 'react';
import BookContext from './BookContext';
import BookReducer from './BookReducer';
import AlertContext from '../alert/AlertContext';
import axios from 'axios';

import {
  GET_BOOKS,
  CLEAR_BOOKS,
  SET_CURRENT_BOOK,
  CLEAR_CURRENT_BOOK,
  SET_LOADING,
  CLEAR_LOADING,
} from '../types';

const BookState = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlert } = alertContext;
  const initialState = {
    books: [],
    curBook: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(BookReducer, initialState);

  /* -- Actions -- */
  //Get Books
  const getBooks = async (query) => {
    try {
      dispatch({ type: SET_LOADING });
      let result = await axios.get(`/api/${query}`);
      dispatch({ type: CLEAR_LOADING });
      dispatch({ type: GET_BOOKS, payload: result.data });
    } catch (err) {
      setAlert('Illegal query.');
      setTimeout(() => {
        clearAlert();
      }, 5000);
    }
  };

  //Clear Books
  const clearBooks = async () => {
    dispatch({ type: CLEAR_BOOKS });
  };

  //Set current book
  const setCurrent = async (book) => {
    dispatch({ type: SET_CURRENT_BOOK, payload: book });
  };

  //Clear current
  const clearCurrent = async () => {
    dispatch({ type: CLEAR_CURRENT_BOOK });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        curBook: state.curBook,
        loading: state.loading,
        getBooks,
        clearBooks,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
