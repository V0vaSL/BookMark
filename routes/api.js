const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route GET
// @desc  Send request to google books api and return the result
// @access public

router.get('/:searchText', async (req, res) => {
  try {
    const results = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.searchText}`
    );
    res.status(200).json(results.data.items);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
