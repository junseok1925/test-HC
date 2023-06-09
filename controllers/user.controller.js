const UserService = require('../services/user.service.js');
const LoginService = require('../services/login.service.js');
const resUtil = require('../utils/response.util.js');

class UserController {
  userService = new UserService();
  loginService = new LoginService();

  emailExists = async (req, res, next) => {
    try {
      const email = req.params.email;
      if (!email) {
        throw resUtil(411, '값 없음 : email');
      }
      const emailExistsData = await this.userService.emailExists(email);
      if (!emailExistsData) {
        throw resUtil(200, '이메일 사용 가능');
      } else {
        throw resUtil(201, '이메일 사용 불가능');
      }
    } catch (err) {
      err.failedMsg = '전체 에러';
      next(err);
    }
  };

  nicknameExists = async (req, res, next) => {
    try {
      const nickname = req.params.nickname;
      if (!nickname) {
        throw resUtil(411, '값 없음 : nickname');
      }
      const nicknameExistsData = await this.userService.nicknameExists(nickname);
      if (!nicknameExistsData) {
        throw resUtil(200, '닉네임 사용 가능');
      } else {
        throw resUtil(201, '닉네임 사용 불가능');
      }
    } catch (err) {
      err.failedMsg = '전체 에러';
      next(err);
    }
  };

  // 인증이메일 보내기
  sendAuthMail = async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        throw resUtil(411, '값 없음 : email');
      }
      let userNum = Math.random().toString().substring(2, 8);
      await this.userService.sendAuthMail(email, userNum);

      const EXPIRE_TIME = 600; // 인증번호 유효시간 5분
      await this.loginService.redis_save_email_auth_number(email, userNum, EXPIRE_TIME);

      res.status(200).json({ userNum: userNum });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errMsg: '인증 이메일 발송에 오류가 발생했습니다. 다시 시도해주세요.' });
    }
  };

  // 인증이메일번호 검증
  verifyMail = async (req, res, next) => {
    const { email, userCode } = req.body;
    // const userCode  = req.body;
    const getRedisNum = await this.loginService.redis_find_email_auth_number(email);
    if (userCode !== getRedisNum) {
      return res.status(400).json({
        errMsg: '인증코드가 일치하지 않습니다.',
      });
    } else {
      return res.status(200).json({ msg: '사용자 이메일 인증에 성공하였습니다.' });
    }
  };

  signup = async (req, res) => {
    try {
      const { email, nickname, password, image, major_id } = req.body;
      if (!email) return res.status(411).json({ errMsg: '값 없음 : email' });
      if (!nickname) return res.status(411).json({ errMsg: '값 없음 : nickname' });
      if (!password) return res.status(411).json({ errMsg: '값 없음 : password' });
      if (!major_id) return res.status(411).json({ errMsg: '값 없음 : major_id' });
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/.test(email)) {
        return res.status(412).json({ errMsg: '형식 에러: 올바른 이메일 형식이 아닙니다' });
      }
      if (!/^[\w가-힣]{2,10}$/.test(nickname)) {
        return res.status(412).json({
          errMsg: '형식 에러: 닉네임은 2~10자의 영문, 한글, 숫자, 밑줄(_)만 허용됩니다',
        });
      }
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,15}$/.test(password)) {
        return res.status(412).json({
          errMsg: '형식 에러: 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함한 8~15자여야 합니다',
        });
      }
      const userData = {
        email,
        nickname,
        password,
        image,
        major_id,
      };
      const signupResult = await this.userService.signup(userData);
      if (signupResult) {
        return res.status(200).json({ msg: '회원가입 완료' });
      } else {
        return res.status(419).json({ errMsg: '회원가입 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  withdrawal = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      if (!user_id) {
        res.status(411).json({ errMsg: '값 없음 : user_id' });
      }
      const userWithdrawal = await this.userService.withdrawal(user_id);
      if (userWithdrawal) {
        return res.status(200).json({ msg: '회원탈퇴 완료' });
      } else {
        return res.status(419).json({ errMsg: '회원탈퇴 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getProfile = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      if (!user_id) {
        res.status(411).json({ errMsg: '값 없음 : user_id' });
      }
      const getProfileData = await this.userService.getProfile(user_id);
      if (getProfileData) {
        return res.status(200).json({ data: getProfileData });
      } else {
        return res.status(419).json({ errMsg: '회원정보 조회 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const userData = {
        user_id,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
        image: req.body.image,
        authority: req.body.authority,
        major_id: req.body.major_id,
      };
      const updateProfileData = await this.userService.updateProfile(userData);
      if (updateProfileData) {
        return res.status(200).json({ msg: '회원정보 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '회원정보 수정 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };
}

module.exports = UserController;
