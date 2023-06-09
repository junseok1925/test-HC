const XnotesRepository = require('../repositories/xnote.repository.js');
const QuestionsRepository = require('../repositories/question.repository.js');

class XnotesService {
  xnotesRepository = new XnotesRepository();
  questionsRepository = new QuestionsRepository();

  submitAnswer = async (XnoteData) => {
    try {
      const { user_id, exam_id, question_id, answer } = XnoteData;

      const getQuestionData = await this.questionsRepository.getQuestionWithQuestionId(question_id);
      const answer_origin = getQuestionData.answer;

      const marking = answer_origin === answer ? 1 : 0; // 맞으면 1, 틀리면 0

      const reXnoteData = {
        user_id,
        exam_id,
        question_id,
        answer,
        marking,
      };

      const userAnswerExists = await this.xnotesRepository.userAnswerExists(reXnoteData);

      if (!userAnswerExists) {
        return await this.xnotesRepository.submitAnswer(reXnoteData);
      } else {
        return await this.xnotesRepository.updateUserAnswer(reXnoteData);
      }
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = XnotesService;
