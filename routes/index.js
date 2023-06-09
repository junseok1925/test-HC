const express = require('express');
const router = express.Router();

const userRouter = require('./user.route.js');
const examinfoRouter = require('./examinfo.route.js');
const questionRouter = require('./question.route.js');
const loginRouter = require('./login.route.js');
const imageRouter = require('./image.router.js');
const searchRouter = require('./search.router.js');
const xnoteRouter = require('./xnote.route.js');
const bookmarkRouter = require('./bookmark.route.js');

router.use('/', [
  userRouter,
  loginRouter,
  examinfoRouter,
  questionRouter,
  imageRouter,
  searchRouter,
  xnoteRouter,
  bookmarkRouter,
]);

module.exports = router;
