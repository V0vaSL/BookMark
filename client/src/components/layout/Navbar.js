import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import AlertContext from '../context/alert/AlertContext';
import BookContext from '../context/book/BookContext';

const Navbar = () => {
  const userContext = useContext(UserContext);
  const { isAuthenticated, firstName, lastName, logout } = userContext;
  const alertContext = useContext(AlertContext);
  const { clearAlert } = alertContext;
  const bookContext = useContext(BookContext);
  const { clearBooks, clearCurrent } = bookContext;
  const onClick = async (e) => {
    if (e.target.text === 'Logout ') {
      logout();
      clearAlert();
      clearBooks();
      clearCurrent();
    } else {
      clearAlert();
    }
  };

  const auth = (
    <Fragment>
      <div className='logo-container'>
        <Link to='/' onClick={onClick}>
          <h1 className='logo'>
            <i className='far fa-bookmark'></i> BookMark
          </h1>
        </Link>
      </div>
      <div className='links'>
        <div className='nav'>
          <Link to='/' onClick={onClick}>
            Search
          </Link>
          <Link to='/library/' onClick={onClick}>
            My Library
          </Link>
        </div>
        <div className='info-logout'>
          <p className='user-id'>
            {' '}
            Hello, {firstName} {lastName}
          </p>
          <Link to='/login' onClick={onClick}>
            Logout <i className='fas fa-sign-out-alt'></i>
          </Link>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <div className='container'>
        {isAuthenticated ? (
          auth
        ) : (
          <Link to='/' onClick={onClick}>
            <h1 className='logo'>
              <i className='far fa-bookmark'></i> BookMark
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
