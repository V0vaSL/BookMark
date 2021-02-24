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
  //Set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  //Set loading
  const clearLoading = () => {
    dispatch({ type: CLEAR_LOADING });
  };

  //Get Books
  const getBooks = async (query) => {
    try {
      setLoading();
      let result = await axios.get(`/api/query/${query}`);
      clearLoading();
      dispatch({ type: GET_BOOKS, payload: result.data });
    } catch (err) {
      clearLoading();
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
        setLoading,
        clearLoading,
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
