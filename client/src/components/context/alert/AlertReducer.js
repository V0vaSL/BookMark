/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, CLEAR_ALERT, SET_INFO, CLEAR_INFO } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        err: true,
        errMsg: action.payload,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        err: false,
        errMsg: '',
      };
    case SET_INFO:
      return {
        ...state,
        info: true,
        infoMsg: action.payload,
      };
    case CLEAR_INFO:
      return {
        ...state,
        info: false,
        infoMsg: '',
      };
    default:
      return state;
  }
};
