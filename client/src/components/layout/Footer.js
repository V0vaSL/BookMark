import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <p>
        {' '}
        <a href='http://vladimirslovo.com' rel='noreferrer' target='_blank'>
          {' '}
          Vladimir Slovo{' '}
        </a>{' '}
        &copy; {new Date().getFullYear()}
      </p>
      <a
        href='https://github.com/V0vaSL?tab=repositories'
        rel='noreferrer'
        target='_blank'
      >
        <i className='fab fa-github fa-2x'></i>
      </a>
      <a
        href='https://www.linkedin.com/in/vladimir-slovo/'
        rel='noreferrer'
        target='_blank'
      >
        <i className='fab fa-linkedin fa-2x'></i>
      </a>
    </div>
  );
};

export default Footer;
