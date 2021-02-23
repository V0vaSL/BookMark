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
      <ul>
        <li>
          <Link to='/' onClick={onClick}>
            <h1>
              <i className='far fa-bookmark'></i> BookMark
            </h1>
          </Link>
        </li>
        <li>
          <Link to='/' onClick={onClick}>
            Search
          </Link>
        </li>
        <li>
          <Link to='/library/' onClick={onClick}>
            My Library
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <p className='user-id'>
            {' '}
            Hello, {firstName} {lastName}
          </p>
        </li>
        <li>
          <Link to='/login' onClick={onClick}>
            Logout <i className='fas fa-sign-out-alt'></i>
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const notAuth = (
    <ul>
      <li>
        <Link to='/' onClick={onClick}>
          <h1>
            <i className='far fa-bookmark'></i> BookMark
          </h1>
        </Link>
      </li>
      <li>
        <Link to='/register' onClick={onClick}>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login' onClick={onClick}>
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <div className='navbar '>
      <div className='container'>{isAuthenticated ? auth : notAuth}</div>
    </div>
  );
};

export default Navbar;
