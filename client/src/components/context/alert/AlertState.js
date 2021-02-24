import React, { useReducer } from 'react';
import { SET_ALERT, CLEAR_ALERT, SET_INFO, CLEAR_INFO } from '../types';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

const AlertState = (props) => {
  const initialState = {
    err: false,
    errMsg: '',
    info: false,
    infoMsg: '',
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
  const setInfo = async (msg) => {
    dispatch({ type: SET_INFO, payload: msg });
  };

  //Clear Alert
  const clearInfo = async () => {
    dispatch({ type: CLEAR_INFO });
  };

  return (
    <AlertContext.Provider
      value={{
        err: state.err,
        errMsg: state.errMsg,
        info: state.info,
        infoMsg: state.infoMsg,
        setAlert,
        clearAlert,
        setInfo,
        clearInfo,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
