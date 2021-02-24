import React from 'react';

const Info = () => {
  const onClick = (e) => {
    const element = document.querySelector('.info');
    element.style.display = 'none';
  };
  return (
    <div className='info'>
      <i className='fas fa-info-circle'></i>
      <p>
        This is a demonstration app. Due to low database capacity, only 6 books
        are allowed per user. Database is cleaned regularly.
      </p>
      <i className='fas fa-times-circle close' onClick={onClick}></i>
    </div>
  );
};

export default Info;
