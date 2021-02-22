const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { dataBase } = require('../config/db');

// @route     POST auth/register
// @desc      Register a user
// @aceess    Public

router.post(
  '/register',
  [
    check('firstName', 'First name is required!').not().isEmpty(),
    check('lastName', 'Last name is required!').not().isEmpty(),
    check('email', 'Email is required!').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('validation error');
      return res.status(500).json({ errors: errors.array() });
    }

    let { firstName, lastName, email, password } = req.body;
    const db = dataBase();
    try {
      // Check if the users exists already
      let sql = `SELECT email FROM users WHERE email='${email}'`;
      const user = await db.query(sql);
      if (user.length !== 0) {
        return res
          .status(400)
          .json({ msg: 'User with this email exists already.' });
      }
      // Hashing password and adding user id.
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      sql = `INSERT INTO users(email,firstName,lastName,password,numOfBooks) values('${email}','${firstName}','${lastName}','${password}',0)`;
      await db.query(sql);

      const payload = {
        user: {
          email: email,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) {
            console.log('jwt error');
            throw err;
          } else {
            res.status(200).json({ token, email, firstName });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    } finally {
      db.close();
    }
  }
);

// @route     POST auth/login
// @desc      Login a user
// @aceess    Public

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const db = dataBase();
    try {
      let sql = `Select email,password FROM users WHERE email='${email}'`;
      let user = await db.query(sql);
      if (user.length !== 1) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatched = await bcrypt.compare(password, user[0].password);
      if (!isMatched) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          email: user[0].email,
        },
      };

      //Load user's library
      sql = `SELECT firstName,title,authors,publisher,publishedDate,description,pageCount,categories,imageLink,avarageRating,readingList FROM users NATURAL JOIN reading NATURAL JOIN books WHERE email = '${email}'`;
      let data = await db.query(sql);

      //send token and library
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token, data, email });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    } finally {
      db.close();
    }
  }
);

module.exports = router;
