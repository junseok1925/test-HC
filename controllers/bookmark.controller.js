const BookmarksService = require('../services/bookmark.service.js');

class BookmarksController {
  bookmarksService = new BookmarksService();
}

module.exports = BookmarksController;
