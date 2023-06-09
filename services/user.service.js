const UserRepository = require('../repositories/user.repository.js');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);
require('dotenv').config();


class UserService {
  userRepository = new UserRepository();

  emailExists = async (email) => {
    try {
      return await this.userRepository.emailExists(email);
    } catch (err) {
      console.error(err);
    }
  };

  nicknameExists = async (nickname) => {
    try {
      return await this.userRepository.nicknameExists(nickname);
    } catch (err) {
      console.error(err);
    }
  };

  signup = async (userData) => {
    try {
      return await this.userRepository.signup(userData);
    } catch (err) {
      console.error(err);
    }
  };

  withdrawal = async (user_id) => {
    try {
      return await this.userRepository.withdrawal(user_id);
    } catch (err) {
      console.error(err);
    }
  };

  getProfile = async (user_id) => {
    try {
      return await this.userRepository.getProfile(user_id);
    } catch (err) {
      console.error(err);
    }
  };

  updateProfile = async (userData) => {
    try {
      return await this.userRepository.updateProfile(userData);
    } catch (err) {
      console.error(err);
    }
  };

  sendAuthMail = async (email, userNum) => {
    try {
      // 비동기 처리, 비동기 작업이 완료될때 까지 기다렸다가 그 결과를  처리한다.
      // 변수 emailTemplete은 렌더링된 에메일 템플릿을 가진다.
      let emailTemplete = await new Promise((resolve, reject) => {
        // 이메일 템플릿 파일 렌더링하는 동안 기다린다
        // ejs 템플릿 엔진을 사용하여 HTML 템플릿을 렌더링한다.
        ejs.renderFile(
          appDir + '/utils/mail.ejs', // 경로생성
          { userCode: userNum }, // 생성 번호 전달
          function (err, data) {
            if (err) {
              reject(err);
            }
            resolve(data);
          }
        );
      });

      // 이메일 전송 객체 생성
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        // TLS 암호화사용 off 이 값이 true인 경우, 서버는 secure connection (SSL/TLS)을 사용한다.
        // false인 경우, upgrade later라는 의미로 STARTTLS를 사용한다. 여기서는 'false'를 사용하므로 STARTTLS가 사용된다
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      // 이메일 전송
      let mailOptions = {
        from: `THE-HERA-CLASS <${process.env.NODEMAILER_USER}>`, // 발신자
        to: email, // 수신자
        subject: '인증번호 확인 메일입니다', // email 제목
        html: emailTemplete, // 이메일 본문
      };

      // 전송결과
      await new Promise((resolve, reject) => { // promise객체를 생성 resolve,reject는 각각 성공,실패했을 때를 처리하기 위한 콜백 함수이다.
        // sandMail메서드를 호출해서 이메일을 보낸다 1번째 인자로 위에서 선언된 mailOptions를 전달하고, 2번째 인자로 콜백함수를 전달
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) { // 콜백 함수 내부에서 먼저 error객체를 체크
            console.error(error);
            reject(error); // Promise의 reject함수를 호출해서 에러를 반환
          } else {
            console.log(`${email}주소로 인증 메일을 보냈습니다.`);
            transporter.close(); // 메일발송작업이 성공적이면 transporter객체를 종료
            resolve(); //Promise의 resolve 함수를 호출하여 작업이 성공적으로 완료되었음을 알림
          }
        });
      });
    } catch (error) {
      console.error(error);
      throw new Error('인증 이메일 발송 실패');
    }
  };
}

module.exports = UserService;
