import React, { useContext, Fragment } from 'react';
import ReadingList from '../layout/ReadingList';
import UserContext from '../context/user/UserContext';
import Info from '../layout/Info';

const Library = () => {
  const userContext = useContext(UserContext);

  const { readingList, wishList, completedList } = userContext;
  return (
    <Fragment>
      <Info />
      <div className='reading-lists-container'>
        <ReadingList
          listName='Reading'
          list='readingList'
          booksArray={readingList}
        />
        <ReadingList
          listName='Wishlist'
          list='wishList'
          booksArray={wishList}
        />
        <ReadingList
          listName='Completed'
          list='completedList'
          booksArray={completedList}
        />
      </div>
    </Fragment>
  );
};

export default Library;
