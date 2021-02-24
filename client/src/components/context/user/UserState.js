import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import AlertContext from '../alert/AlertContext';
import setAuthToken from '../../utils/setAuthToken';
import BookContext from '../book/BookContext';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REMOVE_FROM_LIST,
  GET_USER_BOOKS,
} from '../types';

const TIMEOUT = 3000;

const UserState = (props) => {
  const initialState = {
    email: null,
    firstName: null,
    lastName: null,
    isAuthenticated: false,
    wishList: [],
    readingList: [],
    completedList: [],
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlert, setInfo, clearInfo } = alertContext;
  const bookContext = useContext(BookContext);
  const { setLoading, clearLoading } = bookContext;

  /* -- Actions -- */

  // ----  Login  ----

  const login = async (credentials) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/auth/login', credentials, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      clearAlert();
      return true;
    } catch (err) {
      setAlert(err.response.data.msg);
      dispatch({ type: LOGIN_FAIL });
      setTimeout(() => {
        clearAlert();
      }, TIMEOUT);
      return false;
    }
  };

  //  ----  Register ----

  const register = async (credentials) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/auth/register', credentials, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      clearAlert();
      return true;
    } catch (err) {
      setAlert(err.response.data.msg);
      dispatch({ type: REGISTER_FAIL });
      setTimeout(() => {
        clearAlert();
      }, TIMEOUT);
      return false;
    }
  };

  // ----  Logout  -----

  const logout = async () => {
    dispatch({ type: LOGOUT });
  };

  // ---- Load users's books ----
  const loadUserBooks = async (credentials) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let result = await axios.get('/books/get', credentials, config);
      dispatch({ type: GET_USER_BOOKS, payload: result.data });
    } catch (err) {
      clearLoading();
      setAlert(err.response.data.msg);
      setTimeout(() => {
        clearAlert();
      }, TIMEOUT);
      return false;
    }
  };

  // ----  Add book to user's list  ----

  const addBookToUser = async (readingList, book) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading();
    try {
      let {
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
      } = book;

      if (description[0] === '"' || description[0] === "'") {
        description.substring(1, description.legnth - 1);
      }

      let res = await axios.post(
        '/books/add',
        {
          readingList,
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
        },
        config
      );
      if (
        res.data.msg === 'Reading list updated' ||
        res.data.msg === 'Book added'
      ) {
        setInfo(res.data.msg);
        loadUserBooks();
        setTimeout(() => {
          clearInfo();
        }, TIMEOUT);
      }

      clearAlert();
      clearLoading();
      return true;
    } catch (err) {
      clearLoading();
      setAlert(err.response.data.msg);
      setTimeout(() => {
        clearAlert();
      }, TIMEOUT);
      return false;
    }
  };

  //Remove book from user
  const removeBookFromUser = async (readingList, bookId) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let res = await axios.post(
        '/books/remove',
        { readingList, bookId },
        config
      );
      dispatch({ type: REMOVE_FROM_LIST, payload: { readingList, bookId } });
      setInfo(res.data.msg);
      setTimeout(() => {
        clearInfo();
      }, TIMEOUT);
      return true;
    } catch (err) {
      setAlert(err.response.data.msg);
      setTimeout(() => {
        clearAlert();
      }, TIMEOUT);
      return false;
    }
  };
  /* -- End of Actions -- */

  return (
    <UserContext.Provider
      value={{
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        isAuthenticated: state.isAuthenticated,
        wishList: state.wishList,
        readingList: state.readingList,
        completedList: state.completedList,
        login,
        register,
        logout,
        addBookToUser,
        removeBookFromUser,
        loadUserBooks,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
