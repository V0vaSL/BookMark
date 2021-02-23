import React, { useContext } from 'react';
import BookGridItem from './BookGridItem';
import BooksContext from '../context/book/BookContext';

const BookGrid = () => {
  const booksContext = useContext(BooksContext);
  const { books } = booksContext;

  return (
    <div className='books-grid'>
      {books && books.length > 0
        ? books.map((book) => {
            return (
              <BookGridItem
                key={book.id}
                book={book.volumeInfo}
                bookId={book.id}
                image={
                  book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : null
                }
              />
            );
          })
        : null}
    </div>
  );
};

export default BookGrid;
