/* eslint-disable import/no-anonymous-default-export */
import {
  GET_BOOKS,
  CLEAR_BOOKS,
  SET_CURRENT_BOOK,
  CLEAR_CURRENT_BOOK,
  SET_LOADING,
  CLEAR_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case CLEAR_BOOKS:
      return {
        ...state,
        books: [],
      };
    case SET_CURRENT_BOOK:
      return {
        ...state,
        curBook: action.payload,
      };
    case CLEAR_CURRENT_BOOK:
      return {
        ...state,
        curBook: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
