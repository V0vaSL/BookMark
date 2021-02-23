/* eslint-disable import/no-anonymous-default-export */
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
    case ADD_TO_LIST:
      //Remove the book if it exists in other lists
      let redl, wishl, compl;
      if (action.payload.readingList !== 'readingList') {
        redl = state['readingList'].filter(
          (book) => book.bookId !== action.payload.book.bookId
        );
      }
      if (action.payload.readingList !== 'wishList') {
        wishl = state['wishList'].filter(
          (book) => book.bookId !== action.payload.book.bookId
        );
      }
      if (action.payload.readingList !== 'completedList') {
        compl = state['completedList'].filter(
          (book) => book.bookId !== action.payload.book.bookId
        );
      }
      let addlist = state[action.payload.readingList];
      addlist.push(action.payload.book);
      return {
        ...state,
        readingList: redl,
        wishList: wishl,
        completedList: compl,
        [action.payload.readingList]: addlist,
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
