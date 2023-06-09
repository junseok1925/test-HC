const XnotesService = require('../services/xnote.service.js');
const ExaminfoService = require('../services/examinfo.service.js');
const QuestionService = require('../services/question.service.js');

class XnotesController {
  xnotesService = new XnotesService();
  examinfoService = new ExaminfoService();
  questionService = new QuestionService();

  submitAnswer = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      let { exam_id, question_id, answer } = req.body;

      if (!user_id) return res.status(411).json({ errMsg: '값 없음: user_id' });
      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      if (!question_id) return res.status(411).json({ errMsg: '값 없음: question_id' });
      if (!answer) return res.status(411).json({ errMsg: '값 없음: answer' });

      if (Number(exam_id)) {
        exam_id = Number(exam_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: exam_id 숫자만' });
      }

      if (Number(question_id)) {
        question_id = Number(question_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: question_id 숫자만' });
      }

      if (!(String(answer).length === 1)) return res.status(412).json({ errMsg: '형식 에러: answer 글자 길이 초과' });

      const examExists = await this.examinfoService.getExamWithExamId(exam_id);
      if (!examExists) return res.status(416).json({ errMsg: `데이터 없음: exam_id: ${exam_id} 시험지` });

      const questionExists = await this.questionService.getQuestionWithQuestionId(question_id);
      if (!questionExists) return res.status(416).json({ errMsg: `데이터 없음: question_id: ${question_id} 문제` });

      const XnoteData = {
        user_id,
        exam_id,
        question_id,
        answer,
      };

      const addXnote = await this.xnotesService.submitAnswer(XnoteData);

      if (addXnote) {
        return res.status(200).json({ msg: '답안 제출 완료' });
      } else {
        return res.status(419).json({ errMsg: '답안 제출 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '답안 제출 실패' });
    }
  };
}

module.exports = XnotesController;
