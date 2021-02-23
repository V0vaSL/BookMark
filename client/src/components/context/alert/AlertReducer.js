/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, CLEAR_ALERT } from '../types';

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
    default:
      return state;
  }
};
