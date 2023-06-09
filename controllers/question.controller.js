const mammoth = require('mammoth');
const QuestionService = require('../services/question.service.js');

class QuestionController {
  questionService = new QuestionService();

  addQuestionsWord = async (req, res) => {
    try {
      const body_exam_id = req.body.exam_id;
      if (!body_exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      const exam_id = Number(body_exam_id);
      if (!req.file) return res.status(411).json({ errMsg: '값 없음: file' });
      const buffer = req.file.buffer;
      const parsing = await mammoth.convertToHtml({ buffer });
      const text = parsing.value;
      let html = text.replace(/<p>/gi, '');
      html = html.replace(/<\/p>/gi, '\n');
      const question_array = html.split('```').map((row) => row.trim());
      const result = await this.questionService.addQuestionsWord(exam_id, question_array);
      return res.status(200).json({ data: result.addQuestionData });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '파싱 실패' });
    }
  };

  addQuestionsEditor = async (req, res) => {
    try {
      let { data } = req.body;
      if (!data) return res.status(411).json({ errMsg: '값 없음: data' });
      const result = await this.questionService.addQuestionsEditor(data);
      return res.status(200).json({ data: result.addQuestionData });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '파싱 에러' });
    }
  };

  addQuestion = async (req, res) => {
    try {
      let { exam_id, sort_num, question_num, question, example, choice, answer, solve } = req.body;

      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      if (!sort_num) return res.status(411).json({ errMsg: '값 없음: sort_num' });

      if (Number(exam_id)) {
        exam_id = Number(exam_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: exam_id 숫자만' });
      }

      if (Number(sort_num)) {
        sort_num = Number(sort_num);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: sort_num 숫자만' });
      }

      if (Number(question_num)) {
        question_num = Number(question_num);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: question_num 숫자만' });
      }

      example = JSON.stringify(example);
      choice = JSON.stringify(choice);

      const questionData = {
        exam_id,
        sort_num,
        question_num,
        question,
        example,
        choice,
        answer,
        solve,
      };
      const addQuestionResult = await this.questionService.addQuestion(questionData);
      return res.status(200).json({ data: addQuestionResult });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '문제 등록 실패' });
    }
  };

  getQuestions = async (req, res) => {
    try {
      const getQuestionsData = await this.questionService.getQuestions();
      if (getQuestionsData.length > 0) {
        return res.status(200).json({ data: getQuestionsData });
      } else {
        return res.status(419).json({ errMsg: '문제 없음' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '문제 전체 조회 실패' });
    }
  };

  getQuestionWithQuestionId = async (req, res) => {
    try {
      let { question_id } = req.params;

      if (!question_id) return res.status(411).json({ errMsg: '값 없음: question_id' });

      if (Number(question_id)) {
        question_id = Number(question_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: question_id 숫자만' });
      }

      const getQuestionData = await this.questionService.getQuestionWithQuestionId(question_id);
      if (getQuestionData) {
        return res.status(200).json({ data: getQuestionData });
      } else {
        return res.status(419).json({ errMsg: '문제 없음' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '문제 조회 실패' });
    }
  };

  getQuestionWithExamId = async (req, res) => {
    try {
      let { exam_id } = req.params;

      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });

      if (Number(exam_id)) {
        exam_id = Number(exam_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: exam_id 숫자만' });
      }

      const getQuestionData = await this.questionService.getQuestionWithExamId(exam_id);
      if (getQuestionData) {
        return res.status(200).json({ data: getQuestionData });
      } else {
        return res.status(419).json({ errMsg: '문제 없음' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '문제 조회 실패' });
    }
  };

  updateQuestion = async (req, res) => {
    try {
      let { question_id } = req.params;

      if (!question_id) return res.status(411).json({ errMsg: '값 없음: question_id' });

      if (Number(question_id)) {
        question_id = Number(question_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: question_id 숫자만' });
      }

      const getQuestionData = await this.questionService.getQuestionWithQuestionId(question_id);

      if (!getQuestionData) return res.status(416).json({ errMsg: `question_id: ${question_id} 문제 없음` });

      let { exam_id, sort_num, question_num, question, example, choice, answer, solve } = req.body;

      const questionData = {
        question_id,
        exam_id,
        sort_num,
        question_num,
        question,
        example,
        choice,
        answer,
        solve,
      };
      const updateQuestionResult = await this.questionService.updateQuestion(questionData);

      if (updateQuestionResult) {
        return res.status(200).json({ msg: `question_id: ${question_id} 문제 수정 완료`, data: updateQuestionResult });
      } else {
        return res.status(419).json({ errMsg: `question_id: ${question_id} 문제 수정 실패` });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '문제 수정 실패' });
    }
  };

  deleteQuestion = async (req, res) => {
    try {
      let { question_id } = req.params;

      if (!question_id) return res.status(411).json({ errMsg: '값 없음: question_id' });

      if (Number(question_id)) {
        question_id = Number(question_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: question_id 숫자만' });
      }

      const getQuestionData = await this.questionService.getQuestionWithQuestionId(question_id);

      if (!getQuestionData) return res.status(416).json({ errMsg: `question_id: ${question_id} 문제 없음` });

      const deleteQuestionResult = await this.questionService.deleteQuestion(question_id);

      if (deleteQuestionResult) {
        return res.status(200).json({ msg: `question_id:${question_id} 문제 삭제 완료` });
      } else {
        return res.status(419).json({ errMsg: `question_id: ${question_id} 문제 삭제 실패` });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '문제 삭제 실패' });
    }
  };
}

module.exports = QuestionController;
