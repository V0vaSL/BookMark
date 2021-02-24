/* eslint-disable import/no-anonymous-default-export */
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REMOVE_FROM_LIST,
  GET_USER_BOOKS,
} from '../types';

export default (state, action) => {
  const filterBooks = (list, filteredList) => {
    return list.filter((book) => book.readingList === filteredList);
  };

  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      let wish = filterBooks(action.payload.data, 'wishList');
      let reading = filterBooks(action.payload.data, 'readingList');
      let completed = filterBooks(action.payload.data, 'completedList');
      return {
        ...state,
        email: action.payload.email,
        isAuthenticated: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        wishList: wish,
        readingList: reading,
        completedList: completed,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        email: null,
        firstName: null,
        lastName: null,
        isAuthenticated: false,
        wishList: [],
        readingList: [],
        completedList: [],
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        email: action.payload.email,
        isAuthenticated: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        wishList: [],
        readingList: [],
        completedList: [],
      };
    case GET_USER_BOOKS:
      let wishB = filterBooks(action.payload.books, 'wishList');
      let readingB = filterBooks(action.payload.books, 'readingList');
      let completedB = filterBooks(action.payload.books, 'completedList');
      return {
        ...state,
        wishList: wishB,
        readingList: readingB,
        completedList: completedB,
      };
    case REMOVE_FROM_LIST:
      let remList = state[action.payload.readingList].filter(
        (book) => book.bookId !== action.payload.bookId
      );
      return { ...state, [action.payload.readingList]: remList };
    default:
      return state;
  }
};
