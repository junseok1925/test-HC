const express = require('express');
const router = express.Router();

const BookmarksController = require('../controllers/bookmark.controller.js');
const bookmarksController = new BookmarksController();

module.exports = router;
