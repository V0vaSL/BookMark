import React, { useContext } from 'react';
import ReadingList from '../layout/ReadingList';
import UserContext from '../context/user/UserContext';

const Library = () => {
  const userContext = useContext(UserContext);

  const { readingList, wishList, completedList } = userContext;
  return (
    <div className='reading-lists-container'>
      <ReadingList
        listName='Reading'
        list='readingList'
        booksArray={readingList}
      />
      <ReadingList listName='Wishlist' list='wishList' booksArray={wishList} />
      <ReadingList
        listName='Completed'
        list='completedList'
        booksArray={completedList}
      />
    </div>
  );
};

export default Library;
