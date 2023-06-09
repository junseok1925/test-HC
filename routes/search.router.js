const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');

const SearchController = require('../controllers/search.controller.js');
const searchController = new SearchController();

router.get('/searchExams', searchController.searchExams);


module.exports = router;
