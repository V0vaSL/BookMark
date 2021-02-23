import React, { useReducer } from 'react';
import { SET_ALERT, CLEAR_ALERT } from '../types';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

const AlertState = (props) => {
  const initialState = {
    err: false,
    errMsg: '',
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  /* -- Actions -- */

  //Set Alert
  const setAlert = async (msg) => {
    dispatch({ type: SET_ALERT, payload: msg });
  };

  //Clear Alert
  const clearAlert = async () => {
    dispatch({ type: CLEAR_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{ err: state.err, errMsg: state.errMsg, setAlert, clearAlert }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
