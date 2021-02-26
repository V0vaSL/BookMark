import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import AlertContext from '../context/alert/AlertContext';

const Login = () => {
  const userContext = useContext(UserContext);
  const { login } = userContext;
  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlert } = alertContext;
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.target.email.value !== '' && e.target.password.value !== '') {
      //Login user
      if (
        await login({
          email: e.target.email.value,
          password: e.target.password.value,
        })
      ) {
        history.push('/');
      }
    } else {
      setAlert('All fields are required');
      setTimeout(() => {
        clearAlert();
      }, 5000);
    }
  };

  return (
    <div className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-element'>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' id='email' />
        </div>
        <div className='form-element'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' />
        </div>
        <div className='btn-container'>
          <input type='submit' value='Log In' className='btn' />
        </div>
      </form>
      <p>Don't have an account?</p>
      <Link to='/register'>Register.</Link>
    </div>
  );
};

export default Login;
