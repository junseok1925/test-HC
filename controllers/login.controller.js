const LoginService = require('../services/login.service.js');
const UserService = require('../services/user.service.js');
const jwt = require('../utils/jwt.js');
const redis = require('redis');

const resUtil = require('../utils/response.util.js');

class LoginController {
  loginService = new LoginService();
  userService = new UserService();

  logintst = async (req, res, next) => {
    try {
      res.locals.user;
      res.status(200).send(res.locals.user);
    } catch (err) {
      console.error(err);
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(411).json({ errMsg: '값 없음: 이메일/패스워드' });
      }

      const getUserData = await this.userService.emailExists(email);

      if (!getUserData || getUserData.password !== password) {
        return res.status(419).json({ errMsg: '등록되지 않은 사용자' });
      }

      // const accessToken= await this.loginService.login(getUserData);
      // 테스트용
      const [accessToken, refreshToken] = await this.loginService.login(getUserData);

      res.cookie('accesstoken', `Bearer ${accessToken}`);

      return res.status(200).json({
        accesstoken: accessToken,
        refreshtoken: refreshToken,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '로그인 실패' });
    }
  };

  logout = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const result = await this.loginService.logout(user_id);

      if (result === 1) {
        res.clearCookie('accesstoken');
        return res.status(200).json({ message: '로그아웃 완료' });
      } else {
        return res.status(419).json({ message: '로그아웃 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '로그아웃 실패' });
    }
  };
}

module.exports = LoginController;
