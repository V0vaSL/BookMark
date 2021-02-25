import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import AlertContext from '../alert/AlertContext';
import setAuthToken from '../../utils/setAuthToken';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  /* -- Actions -- */

  // ----  Login  ----

  const login = async (credentials) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth/login', credentials, config);
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
      const res = await axios.post('/api/auth/register', credentials, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      clearAlert();
      return true;
    } catch (err) {
      setAlert(err.response.data.errors);
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
      let result = await axios.get('/api/books/get', credentials, config);
      dispatch({ type: GET_USER_BOOKS, payload: result.data });
    } catch (err) {
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

      let res = await axios.post(
        '/api/books/add',
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
      await loadUserBooks();
      setTimeout(() => {
        clearInfo();
      }, TIMEOUT);
      setInfo(res.data.msg);
      scrollToTop();
      clearAlert();
      return true;
    } catch (err) {
      setAlert(err.response.data.msg);
      scrollToTop();
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
        '/api/books/remove',
        { readingList, bookId },
        config
      );
      await loadUserBooks();
      setInfo(res.data.msg);
      scrollToTop();
      setTimeout(() => {
        clearInfo();
      }, TIMEOUT);
      return true;
    } catch (err) {
      setAlert(err.response.data.msg);
      scrollToTop();
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
