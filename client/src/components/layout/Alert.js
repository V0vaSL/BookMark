import React, { useContext } from 'react';
import AlertContext from '../context/alert/AlertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { err, errMsg, info, infoMsg } = alertContext;

  return (
    <div>
      {err ? (
        <p className='alert'>
          <i className='fas fa-exclamation-circle'></i>
          {' ' + errMsg}
        </p>
      ) : null}
      {info ? (
        <p className='info-alert'>
          <i className='fas fa-check-circle'></i>
          {' ' + infoMsg}
        </p>
      ) : null}
    </div>
  );
};

export default Alert;
