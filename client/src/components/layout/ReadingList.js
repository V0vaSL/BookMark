import React from 'react';
import LibraryItem from './LibraryItem';

const ReadingList = (props) => {
  const { listName, booksArray, list } = props;
  return (
    <div className='reading-list'>
      <h2>
        {listName} ({booksArray ? booksArray.length : 0})
      </h2>
      <div className='reading-list-books'>
        {booksArray &&
          booksArray.map((book) => {
            return (
              <LibraryItem
                key={book.bookId}
                book={book}
                bookId={book.bookId}
                image={book.imageLink}
                list={list}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ReadingList;
