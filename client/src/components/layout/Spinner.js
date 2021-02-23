import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{
        width: '50px',
        margin: 'auto',
        display: 'block',
        background: ' #f5f4f4',
      }}
    />
  </Fragment>
);

export default Spinner;
