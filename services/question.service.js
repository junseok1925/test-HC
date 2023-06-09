const QuestionRepository = require('../repositories/question.repository.js');

// let question_datas = [];

class QuestionService {
  questionRepository = new QuestionRepository();

  addQuestionsWord = async (exam_id, question_array) => {
    const clearText = async (text) => text.replace(/^\s+|\s+$/g, '');

    const s3_url = async (value) => {
      if (value.indexOf('<img') >= 0) {
        const img_src_start_index = value.indexOf(';base64,') + 8;
        const img_extension_start_index = value.indexOf('data:image/') + 11;
        const img_src_end_index = value.indexOf('" />');
        const img_extension = value.substring(img_extension_start_index, img_src_start_index - 8);
        const img_src = value.substring(img_src_start_index, img_src_end_index);
        const img_s3_url = await this.questionRepository.addImageS3(img_src, img_extension);
        return {
          type: 'image',
          value: img_s3_url,
        };
      } else {
        return {
          type: 'text',
          value: value,
        };
      }
    };

    const question_data_array = await Promise.all(
      question_array.map(async (text, index) => {
        let question_init_array = [];
        let question_init_object = {};

        const example_start_index = text.indexOf('\n--보기문\n');
        const choice_1_index = text.indexOf('①');
        const choice_2_index = text.indexOf('②');
        const choice_3_index = text.indexOf('③');
        const choice_4_index = text.indexOf('④');
        const answer_start_index = text.indexOf('--정답');
        const solve_start_index = text.indexOf('--해설\n');
        const text_end_index = text.length;

        if (choice_1_index < 0) {
          // 알림유형
          if (example_start_index < 0) {
            // 보기문 없음
            const question_value = await clearText(text.substring(2, text_end_index));
            question_init_object = { exam_id, sort_num: index + 1, question: question_value };
            // question_init_array.push(question_value);
          } else {
            // 보기문 있음
            const question_value = await clearText(text.substring(2, example_start_index));
            let example_value = await clearText(text.substring(example_start_index, text_end_index));
            const example_value_split = example_value.split('--보기문\n');
            example_value_split.shift();
            example_value = example_value_split.map((text) => text.trim());
            example_value = await Promise.all(
              example_value.map(async (example) => {
                if (example.indexOf('<img') >= 0) {
                  const img_src_start_index = example.indexOf(';base64,') + 8;
                  const img_extension_start_index = example.indexOf('data:image/') + 11;
                  const img_src_end_index = example.indexOf('" />');
                  const img_extension = example.substring(img_extension_start_index, img_src_start_index - 8);
                  const img_src = example.substring(img_src_start_index, img_src_end_index);
                  const img_s3_url = await this.questionRepository.addImageS3(img_src, img_extension);
                  return {
                    type: 'image',
                    value: img_s3_url,
                  };
                } else {
                  return {
                    type: 'text',
                    value: example,
                  };
                }
              })
            );
            question_init_object = { exam_id, sort_num: index + 1, question: question_value, example: example_value };
          }
        } else {
          // 문제유형
          if (example_start_index < 0) {
            // 보기문 없음
            const question_number_value = await clearText(text.substring(0, text.indexOf('. ')));
            const question_value = await clearText(text.substring(2, choice_1_index));
            question_init_object = {
              exam_id,
              sort_num: index + 1,
              question_num: Number(question_number_value),
              question: question_value,
            };
          } else {
            // 보기문 있음
            const question_number_value = await clearText(text.substring(0, text.indexOf('. ')));
            const question_value = await clearText(text.substring(2, example_start_index));
            let example_value = await clearText(text.substring(example_start_index, choice_1_index));
            const example_value_split = example_value.split('--보기문\n');
            example_value_split.shift();
            example_value = example_value_split.map((text) => text.trim());
            example_value = await Promise.all(
              example_value.map(async (example) => {
                if (example.indexOf('<img') >= 0) {
                  const img_src_start_index = example.indexOf(';base64,') + 8;
                  const img_extension_start_index = example.indexOf('data:image/') + 11;
                  const img_src_end_index = example.indexOf('" />');
                  const img_extension = example.substring(img_extension_start_index, img_src_start_index - 8);
                  const img_src = example.substring(img_src_start_index, img_src_end_index);
                  const img_s3_url = await this.questionRepository.addImageS3(img_src, img_extension);
                  return {
                    type: 'image',
                    value: img_s3_url,
                  };
                } else {
                  return {
                    type: 'text',
                    value: example,
                  };
                }
              })
            );
            question_init_object = {
              exam_id,
              sort_num: index + 1,
              question_num: Number(question_number_value),
              question: question_value,
              example: example_value,
            };
          }
          let choice_1_value = await clearText(text.substring(choice_1_index + 1, choice_2_index));
          choice_1_value = await s3_url(choice_1_value);
          let choice_2_value = await clearText(text.substring(choice_2_index + 1, choice_3_index));
          choice_2_value = await s3_url(choice_2_value);
          let choice_3_value = await clearText(text.substring(choice_3_index + 1, choice_4_index));
          choice_3_value = await s3_url(choice_3_value);
          let choice_4_value = await clearText(text.substring(choice_4_index + 1, answer_start_index));
          choice_4_value = await s3_url(choice_4_value);
          let choice_array = [];
          choice_array.push({
            option: '1',
            type: choice_1_value.type,
            value: choice_1_value.value,
          });
          choice_array.push({
            option: '2',
            type: choice_2_value.type,
            value: choice_2_value.value,
          });
          choice_array.push({
            option: '3',
            type: choice_3_value.type,
            value: choice_3_value.value,
          });
          choice_array.push({
            option: '4',
            type: choice_4_value.type,
            value: choice_4_value.value,
          });
          const answer_value = await clearText(text.substring(answer_start_index + 4, solve_start_index));
          const solve_value = await clearText(text.substring(solve_start_index + 4, text_end_index));

          question_init_object.choice = choice_array;
          question_init_object.answer = answer_value;
          question_init_object.solve = solve_value;
        }
        return question_init_object;
      })
    );
    const addQuestionResult = await this.questionRepository.addQuestionsWord(question_data_array);
    console.log('addQuestionResult', addQuestionResult);
    return {
      addQuestionResult,
      addQuestionData: question_data_array,
    };
  };

  addQuestionsEditor = async (data) => {
    const addQuestionResult = await this.questionRepository.addQuestionsEditor(data);
    return {
      addQuestionResult,
      addQuestionData: data,
    };
  };

  addQuestion = async (questionData) => {
    try {
      return await this.questionRepository.addQuestion(questionData);
    } catch (err) {
      console.error(err);
    }
  };

  getQuestions = async () => {
    try {
      const getQuestionsData = await this.questionRepository.getQuestions();
      return getQuestionsData.map((data) => {
        return {
          exam_id: data.exam_id,
          sort_num: data.sort_num,
          question_num: data.question_num,
          question: data.question,
          example: JSON.parse(data.example),
          choice: JSON.parse(data.choice),
          answer: data.answer,
          solve: data.solve,
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  getQuestionWithQuestionId = async (question_id) => {
    try {
      const getQuestionData = await this.questionRepository.getQuestionWithQuestionId(question_id);
      return {
        exam_id: getQuestionData.exam_id,
        sort_num: getQuestionData.sort_num,
        question_num: getQuestionData.question_num,
        question: getQuestionData.question,
        example: JSON.parse(getQuestionData.example),
        choice: JSON.parse(getQuestionData.choice),
        answer: getQuestionData.answer,
        solve: getQuestionData.solve,
      };
    } catch (err) {
      console.error(err);
    }
  };

  getQuestionWithExamId = async (exam_id) => {
    try {
      const getQuestionData = await this.questionRepository.getQuestionWithExamId(exam_id);
      return getQuestionData.map((data) => {
        return {
          exam_id: data.exam_id,
          sort_num: data.sort_num,
          question_num: data.question_num,
          question: data.question,
          example: JSON.parse(data.example),
          choice: JSON.parse(data.choice),
          answer: data.answer,
          solve: data.solve,
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateQuestion = async (questionData) => {
    try {
      return await this.questionRepository.updateQuestion(questionData);
    } catch (err) {
      console.error(err);
    }
  };

  deleteQuestion = async (question_id) => {
    try {
      return await this.questionRepository.deleteQuestion(question_id);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = QuestionService;
