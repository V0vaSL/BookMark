import React, { useContext } from 'react';
import Search from '../layout/Search';
import Spinner from '../layout/Spinner';
import BookGrid from '../layout/BookGrid';
import BookContext from '../context/book/BookContext';

const Home = () => {
  const bookContext = useContext(BookContext);
  const { loading } = bookContext;
  return (
    <div className='home'>
      <Search />
      {loading ? <Spinner /> : <BookGrid />}
    </div>
  );
};

export default Home;
