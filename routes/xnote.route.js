const express = require('express');
const router = express.Router();

const XnotesController = require('../controllers/xnote.controller.js');
const authMiddleware = require('../middlewares/auth-middleware.js');

const xnotesController = new XnotesController();

router.post('/submitAnswer', authMiddleware, xnotesController.submitAnswer);

module.exports = router;
