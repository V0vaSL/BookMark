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
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  REMOVE_FROM_LIST_FAILED,
} from '../types';

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
  const { setAlert, clearAlert } = alertContext;

  /* -- Actions -- */

  // Login
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
      }, 5000);
      return false;
    }
  };

  // Register
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
      }, 5000);
      return false;
    }
  };

  //Logout

  const logout = async () => {
    dispatch({ type: LOGOUT });
  };

  //Add book to user's list
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
      await axios.post(
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
      dispatch({ type: ADD_TO_LIST, payload: { readingList, book } });
      clearAlert();
      return true;
    } catch (err) {
      setAlert(err.response.data.msg);
      setTimeout(() => {
        clearAlert();
      }, 5000);
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
      await axios.post('/books/remove', { readingList, bookId }, config);
      dispatch({ type: REMOVE_FROM_LIST, payload: { readingList, bookId } });
      return true;
    } catch (err) {
      setAlert(err.response.data.msg);
      setTimeout(() => {
        clearAlert();
      }, 5000);
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
