const express = require('express');
const router = express.Router();
const multer = require('multer');

const QuestionController = require('../controllers/question.controller.js');
const questionController = new QuestionController();

const storage = multer.memoryStorage(); // 메모리에서 파일 처리
const upload = multer({ storage: storage });

router.post('/question_file', upload.single('file'), questionController.addQuestionsWord);
router.post('/question_editor', questionController.addQuestionsEditor);
router.post('/question', questionController.addQuestion);
router.get('/question', questionController.getQuestions);
router.get('/question/:question_id', questionController.getQuestionWithQuestionId);
router.get('/question/exam/:exam_id', questionController.getQuestionWithExamId);
router.put('/question/:question_id', questionController.updateQuestion);
router.delete('/question/:question_id', questionController.deleteQuestion);

module.exports = router;
