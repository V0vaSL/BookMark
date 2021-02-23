import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/user/UserContext';
import AlertContext from '../context/alert/AlertContext';

const Register = () => {
  const userContext = useContext(UserContext);
  const { register } = userContext;
  const alertContext = useContext(AlertContext);
  const { setAlert, clearAlert } = alertContext;
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      e.target.firstName.value !== '' &&
      e.target.lastName.value !== '' &&
      e.target.email.value !== '' &&
      e.target.password1.value !== '' &&
      e.target.password2.value !== ''
    ) {
      if (
        await register({
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          email: e.target.email.value,
          password: e.target.password1.value,
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
          <label htmlFor='firstName'>First Name:</label>
          <input type='text' name='firstName' id='firstName' />
        </div>
        <div className='form-element'>
          <label htmlFor='lastName'>Last Name:</label>
          <input type='text' name='lastName' id='lastName' />
        </div>
        <div className='form-element'>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' id='email' />
        </div>
        <div className='form-element'>
          <label htmlFor='password1'>Password:</label>
          <input type='password' name='password1' id='password1' />
        </div>
        <div className='form-element'>
          <label htmlFor='password2'>Repeat Password:</label>
          <input type='password' name='password2' id='password2' />
        </div>
        <div className='btn-container'>
          <input type='submit' value='Register' className='btn' />
        </div>
      </form>
      <p>Already have an account?</p>
      <Link to='/login'>Sign in instead.</Link>
    </div>
  );
};

export default Register;
