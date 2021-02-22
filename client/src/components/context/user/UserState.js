import React, { userReducer } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADD_TO_LIST,
  ADD_TO_LIST_FAILED,
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
  const [state, dispatch] = userReducer(UserReducer, initialState);

  /* -- Actions -- */

  // Login
  const login = async (credentials) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //Add email and password validation
    let { email, password } = credentials;
    try {
      const res = await axios('/auth/login', { email, password }, config);
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: LOGIN_FAIL });
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
