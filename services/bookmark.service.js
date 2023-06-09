const BookmarksRepository = require('../repositories/bookmark.repository.js');

class BookmarksService {
  bookmarksRepository = new BookmarksRepository();
}

module.exports = BookmarksService;
