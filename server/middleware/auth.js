const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');

// Verify user token to allow access
module.exports = function (req, res, next) {
  //Get Toeken from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
