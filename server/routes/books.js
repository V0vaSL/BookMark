const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { dataBase } = require('../../config/db');
const auth = require('../middleware/auth');

const MAX_NUM_OF_BOOKS = 6;

// @route Get
// @desc  get user's book
// @access private

router.get('/get', auth, async (req, res) => {
  const db = dataBase();
  try {
    sql = `SELECT bookId,firstName,title,authors,publisher,publishedDate,description,pageCount,categories,imageLink,averageRating,readingList FROM users NATURAL JOIN reading NATURAL JOIN books WHERE email = '${req.user.email}'`;
    let data = await db.query(sql);
    return res.status(200).json({ books: data });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  } finally {
    db.close();
  }
});

// @route POST
// @desc  Adds a book to a list
// @access private

router.post(
  '/add',
  auth,
  [
    check('bookId', 'Book id is required.').not().isEmpty(),
    check('title', 'Book title is required.').not().isEmpty(),
    check('authors', 'Book authors are required.').not().isEmpty(),
    check('readingList', 'readingList is required.').not().isEmpty(),
  ],
  async (req, res) => {
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array()[0].msg);
      return res.status(500).json({ msg: errors.array()[0].msg });
    }

    const db = dataBase();
    try {
      //Check if user has more than 6 books
      let sql = `SELECT numOfBooks FROM users WHERE email='${req.user.email}'`;
      let result = await db.query(sql);
      let bookCount = result[0].numOfBooks;
      if (bookCount == MAX_NUM_OF_BOOKS) {
        //check if the user has it in one of his reading lists
        sql = `SELECT bookId,readingList FROM reading WHERE bookId='${req.body.bookId}' and email='${req.user.email}'`;
        result = await db.query(sql);
        if (result.length !== 0) {
          if (result[0].readingList === req.body.readingList) {
            //if in the same list as we try to add, return error
            return res
              .status(403)
              .json({ msg: 'Book already in that reading list' });
          } else {
            //if different list update the row in reading table
            sql = `UPDATE reading SET readingList = '${req.body.readingList}' WHERE bookId='${req.body.bookId}' and email='${req.user.email}'`;
            await db.query(sql);
            return res.status(200).json({ msg: 'Reading list updated' });
          }
        } else {
          return res.status(403).json({ msg: 'No more books allowed' });
        }
      }

      //check if the book exist in the database
      sql = `SELECT bookId FROM books WHERE bookId='${req.body.bookId}'`;
      result = await db.query(sql);
      if (result.length === 0) {
        // No book in the database
        //add the book to the books table
        sql = `INSERT INTO books (bookId,title,authors,publisher,publishedDate,description,pageCount,categories,averageRating,imageLink) values (
        '${req.body.bookId}',
        '${req.body.title}',
        '${req.body.authors.join(',')}',
        '${req.body.publisher ? req.body.publisher : null}',
        '${req.body.publishedDate ? req.body.publishedDate : null}',
        "${req.body.description ? req.body.description : null}",
        ${req.body.pageCount ? req.body.pageCount : null},
        '${req.body.categories ? req.body.categories.join(',') : null}',
        ${req.body.averageRating ? req.body.averageRating : null},
        '${req.body.imageLink ? req.body.imageLink : null}')`;
        await db.query(sql);

        //add the book and the user to the reading table
        sql = `INSERT INTO reading(email,bookId,readingList) values(
        '${req.user.email}',
        '${req.body.bookId}',
        '${req.body.readingList}'
      )`;
        await db.query(sql);
        //update numOfBooks of user.
        sql = `UPDATE users SET numOfBooks = ${++bookCount} WHERE email='${
          req.user.email
        }'`;
        await db.query(sql);
        return res.status(200).json({ msg: 'Book added' });
      } else {
        //check if the user has it in one of his reading lists
        sql = `SELECT bookId,readingList FROM reading WHERE bookId='${req.body.bookId}' and email='${req.user.email}'`;
        result = await db.query(sql);
        if (result.length !== 0) {
          if (result[0].readingList === req.body.readingList) {
            //if in the same list as we try to add, return error
            return res
              .status(403)
              .json({ msg: 'Book already in that reading list' });
          } else {
            //if different list update the row in reading table
            sql = `UPDATE reading SET readingList = '${req.body.readingList}' WHERE bookId='${req.body.bookId}' and email='${req.user.email}'`;
            await db.query(sql);
            return res.status(200).json({ msg: 'Reading list updated' });
          }
        } else {
          // Add the book and the user to the reading table and update numOfBooks of user
          //add the book and the user to the reading table
          sql = `INSERT INTO reading(email,bookId,readingList) values(
        '${req.user.email}',
        '${req.body.bookId}',
        '${req.body.readingList}'
      )`;
          await db.query(sql);
          //update numOfBooks of user.
          sql = `UPDATE users SET numOfBooks = ${++bookCount} WHERE email='${
            req.user.email
          }'`;
          await db.query(sql);
          return res.status(200).json({ msg: 'Books added' });
        }
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    } finally {
      db.close();
    }
  }
);

// @route POST
// @desc  Removes a book from a list
// @access private

router.post(
  '/remove',
  auth,
  [
    check('bookId', 'Book id is required.').not().isEmpty(),
    check('readingList', 'readingList is required.').not().isEmpty(),
  ],
  async (req, res) => {
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(500).json({ msg: errors.array()[0].msg });
    }

    const db = dataBase();
    try {
      //try to remove the book from reading.
      let sql = `DELETE FROM reading WHERE bookId='${req.body.bookId}' and email='${req.user.email}'`;
      let result = await db.query(sql);
      if (result.length !== 0) {
        //decrement the numOfBooks of user
        sql = `SELECT numOfBooks FROM users WHERE email='${req.user.email}'`;
        result = await db.query(sql);
        let bookCount = result[0].numOfBooks;
        sql = `UPDATE users SET numOfBooks = ${--bookCount} WHERE email='${
          req.user.email
        }'`;
        await db.query(sql);
        //check if the book is assosiated to other users
        sql = `SELECT bookId FROM reading WHERE bookId='${req.body.bookId}'`;
        result = await db.query(sql);
        if (result.length === 0) {
          //remove book from books table
          sql = `DELETE FROM books WHERE bookId='${req.body.bookId}'`;
          await db.query(sql);
        }
        return res.status(200).json({ msg: 'Book deleted' });
      } else {
        return res.status(403).json({ msg: 'Book not found' });
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    } finally {
      db.close();
    }
  }
);

module.exports = router;
