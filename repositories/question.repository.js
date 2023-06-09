const { Questions } = require('../models');
const AWS = require('aws-sdk');
// const { Upload } = require('@aws-sdk/lib-storage'); // V3
// const { S3 } = require('@aws-sdk/client-s3'); // V3

// const { promisify } = require('util');
const fs = require('fs');
// const writeFileAsync = promisify(fs.writeFile);
// const multer = require('multer');
// const multerS3 = require('multer-s3');
require('dotenv').config();

class QuestionRepository {
  addQuestionsWord = async (question_datas) => {
    try {
      // DB Create
      question_datas.forEach((question) => {
        return Questions.create({
          exam_id: question.exam_id,
          sort_num: question.sort_num,
          question_num: question.question_num,
          question: question.question,
          example: JSON.stringify(question.example),
          choice: JSON.stringify(question.choice),
          answer: question.answer,
          solve: question.solve,
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  addQuestionsEditor = async (data) => {
    try {
      // DB Create
      await data.forEach((question) => {
        return Questions.create({
          exam_id: question.exam_id,
          sort_num: question.sort_num,
          question_num: question.question_num,
          question: question.question,
          example: JSON.stringify(question.example),
          choice: JSON.stringify(question.choice),
          answer: question.answer,
          solve: question.solve,
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  addImageS3 = async (base64Image, extension) => {
    try {
      // AWS-S3 설정
      const s3 = new AWS.S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
      // base64 이미지를 디코딩하여 이미지 파일로 변환
      const decodedImage = Buffer.from(base64Image, 'base64');
      // 파일 키 생성 로직 - 날짜 추출하여 각 변수명으로 분할 할당
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const currentDate = today.getDate();
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const currentSecond = today.getSeconds();
      const date = `${currentYear}-${currentMonth}-${currentDate}-${currentHour}-${currentMinute}-${currentSecond}`;
      // 4자리 랜덤숫자 생성
      let randomNumber = '';
      for (let i = 0; i < 4; i++) {
        randomNumber += String(Math.floor(Math.random() * 10));
      }
      // AWS S3에 이미지를 업로드
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${process.env.AWS_FOLDER_QUESTION}/${date}_${randomNumber}.${extension}`,
        Body: decodedImage,
        ACL: 'public-read',
        ContentType: `image/${extension}`,
      };
      // const uploadResult = await new Upload({
      //   client: s3,
      //   params: uploadParams,
      // }).done(); // V3
      const uploadResult = await s3.upload(uploadParams).promise();
      // 업로드된 이미지의 URL을 반환
      const imageUrl = uploadResult.Location;
      return imageUrl;
    } catch (err) {
      console.error(err);
      throw err; // 오류 처리 후 다시 throw
    }
  };

  addQuestion = async (questionData) => {
    const { exam_id, sort_num, question_num, question, example, choice, answer, solve } = questionData;
    try {
      return await Questions.create({
        exam_id,
        sort_num,
        question_num,
        question,
        example,
        choice,
        answer,
        solve,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getQuestions = async () => {
    try {
      return await Questions.findAll({});
    } catch (err) {
      console.error(err);
    }
  };

  getQuestionWithQuestionId = async (question_id) => {
    try {
      return await Questions.findOne({ where: { question_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getQuestionWithExamId = async (exam_id) => {
    try {
      return await Questions.findAll({ where: { exam_id } });
    } catch (err) {
      console.error(err);
    }
  };

  updateQuestion = async (questionData) => {
    try {
      const updateQuestionData = await Questions.update(
        {
          exam_id: questionData.exam_id,
          sort_num: questionData.sort_num,
          question_num: questionData.question_num,
          question: questionData.question,
          example: questionData.example,
          choice: questionData.choice,
          answer: questionData.answer,
          solve: questionData.solve,
        },
        { where: { question_id: questionData.question_id } }
      );
      const updateResult = await Questions.findOne({ where: { question_id: questionData.question_id } });
      return updateResult;
    } catch (err) {
      console.error(err);
    }
  };

  deleteQuestion = async (question_id) => {
    try {
      return await Questions.destroy({ where: { question_id } });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = QuestionRepository;
